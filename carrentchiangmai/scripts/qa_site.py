#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dependency-free structural QA for the generated static site."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public_html"
EXPECTED = {
    "/", "/car-with-driver-chiang-mai/", "/chiang-mai-airport-transfer/",
    "/chiang-mai-sedan-with-driver/", "/chiang-mai-suv-with-driver/",
    "/chiang-mai-van-with-driver/", "/chiang-mai-executive-car/",
    "/chiang-mai-car-rental-prices/", "/tours/", "/tours/doi-inthanon/",
    "/tours/mae-kampong/", "/tours/mon-jam/", "/tours/doi-suthep/",
    "/tours/chiang-rai-day-trip/", "/tours/doi-ang-khang/", "/about/",
    "/reviews/", "/faq/", "/contact/", "/booking-policy/", "/privacy-policy/",
}


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.title = ""
        self.description = ""
        self.canonical = ""
        self.h1 = 0
        self.links: list[str] = []
        self.ids: set[str] = set()
        self.labels: set[str] = set()
        self.controls: set[str] = set()
        self.json_ld: list[str] = []
        self._capture_title = False
        self._capture_json = False
        self._buffer: list[str] = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self._capture_title = True
        elif tag == "meta" and attrs.get("name") == "description":
            self.description = attrs.get("content", "")
        elif tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href", "")
        elif tag == "h1":
            self.h1 += 1
        elif tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        elif tag == "label" and attrs.get("for"):
            self.labels.add(attrs["for"])
        elif tag in {"input", "select", "textarea"} and attrs.get("id"):
            if attrs.get("type") != "checkbox":
                self.controls.add(attrs["id"])
        elif tag == "script" and attrs.get("type") == "application/ld+json":
            self._capture_json = True
            self._buffer = []
        if attrs.get("id"):
            self.ids.add(attrs["id"])

    def handle_endtag(self, tag):
        if tag == "title":
            self._capture_title = False
        elif tag == "script" and self._capture_json:
            self.json_ld.append("".join(self._buffer))
            self._capture_json = False

    def handle_data(self, data):
        if self._capture_title:
            self.title += data
        if self._capture_json:
            self._buffer.append(data)


def file_for(path: str) -> Path:
    return PUBLIC / ("index.html" if path == "/" else path.strip("/") + "/index.html")


def main() -> int:
    errors: list[str] = []
    titles: dict[str, str] = {}
    descriptions: dict[str, str] = {}
    all_text = ""

    for route in sorted(EXPECTED):
        target = file_for(route)
        if not target.exists():
            errors.append(f"{route}: missing {target.relative_to(ROOT)}")
            continue
        source = target.read_text(encoding="utf-8")
        all_text += source
        parser = AuditParser()
        parser.feed(source)
        if parser.h1 != 1:
            errors.append(f"{route}: expected one H1, found {parser.h1}")
        if not parser.title or len(parser.title) > 70:
            errors.append(f"{route}: title missing or too long ({len(parser.title)})")
        if not parser.description or len(parser.description) > 180:
            errors.append(f"{route}: description missing or too long ({len(parser.description)})")
        if parser.title in titles:
            errors.append(f"{route}: duplicate title with {titles[parser.title]}")
        titles[parser.title] = route
        if parser.description in descriptions:
            errors.append(f"{route}: duplicate description with {descriptions[parser.description]}")
        descriptions[parser.description] = route
        expected_canonical = f"https://carrentchiangmai.com{route}"
        if parser.canonical != expected_canonical:
            errors.append(f"{route}: canonical is {parser.canonical!r}")
        if not parser.json_ld:
            errors.append(f"{route}: missing JSON-LD")
        for block in parser.json_ld:
            try:
                json.loads(block)
            except json.JSONDecodeError as exc:
                errors.append(f"{route}: invalid JSON-LD ({exc})")
        missing_labels = parser.controls - parser.labels
        if missing_labels:
            errors.append(f"{route}: controls missing labels {sorted(missing_labels)}")
        for href in parser.links:
            parsed = urlparse(href)
            if href.startswith(("#", "tel:", "mailto:")) or parsed.scheme in {"http", "https"}:
                continue
            route_part = parsed.path
            if not route_part.startswith("/"):
                errors.append(f"{route}: relative internal link {href}")
                continue
            if route_part.endswith((".css", ".js", ".ico", ".png", ".jpg", ".webp", ".xml")):
                continue
            target_link = PUBLIC / ("index.html" if route_part == "/" else route_part.strip("/") + ("/index.html" if route_part.endswith("/") else ""))
            if not target_link.exists():
                errors.append(f"{route}: broken internal link {href}")

    forbidden_patterns = {
        r"\b\d{3}-\d-\d{5}-\d\b": "public bank account pattern",
        r"90K\+": "unsupported statistic",
        r"9,999 ผู้ใช้บริการ": "unsupported statistic",
    }
    for pattern, label in forbidden_patterns.items():
        if re.search(pattern, all_text):
            errors.append(f"forbidden {label}")
    if not (PUBLIC / "robots.txt").exists():
        errors.append("robots.txt missing")
    if not (PUBLIC / "sitemap.xml").exists():
        errors.append("sitemap.xml missing")
    sitemap = (PUBLIC / "sitemap.xml").read_text(encoding="utf-8")
    for route in EXPECTED:
        if f"<loc>https://carrentchiangmai.com{route}</loc>" not in sitemap:
            errors.append(f"sitemap missing {route}")
    if re.search(r'href=["\']#["\']', all_text):
        errors.append("placeholder href=# remains")

    print(f"Checked {len(EXPECTED)} indexable pages.")
    if errors:
        print(f"FAIL: {len(errors)} issue(s)")
        for error in errors:
            print(f"- {error}")
        return 1
    print("PASS: metadata, headings, schema, labels, links, sitemap, and forbidden-content checks.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
