import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
  ogImage?: string;
  lang?: 'th' | 'en';
  hreflangTh?: string;
  hreflangEn?: string;
  jsonLd?: any | any[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  keywords = 'รถเช่าพร้อมคนขับเชียงใหม่, รถพร้อมคนขับเชียงใหม่, เหมารถเชียงใหม่, รถเช่าเชียงใหม่พร้อมคนขับ, รถนำเที่ยวเชียงใหม่, รถเที่ยวเชียงใหม่, รถตู้พร้อมคนขับเชียงใหม่, รถรับส่งสนามบินเชียงใหม่',
  ogImage = 'https://mrcarrentcm.com/images/vip_van_2026.jpg',
  lang = 'th',
  hreflangTh,
  hreflangEn,
  jsonLd
}) => {
  useEffect(() => {
    // Document Title
    document.title = title;
    document.documentElement.lang = lang;

    // Helper to set or create meta tag
    const setMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLink = (rel: string, href: string, hreflang?: string) => {
      let selector = `link[rel="${rel}"]`;
      if (hreflang) {
        selector += `[hreflang="${hreflang}"]`;
      }
      let el = document.querySelector(selector) as HTMLLinkElement;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (hreflang) el.setAttribute('hreflang', hreflang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Meta Description & Keywords
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);

    // Canonical Link
    setLink('canonical', canonicalUrl);

    // Hreflang
    const thUrl = hreflangTh || canonicalUrl;
    const enUrl = hreflangEn || (canonicalUrl.includes('/en/') ? canonicalUrl : `https://mrcarrentcm.com/en${new URL(canonicalUrl).pathname}`);
    setLink('alternate', thUrl, 'th');
    setLink('alternate', enUrl, 'en');
    setLink('alternate', thUrl, 'x-default');

    // Open Graph
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'en' ? 'en_US' : 'th_TH');

    // Twitter
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // JSON-LD Structured Data
    let scriptEl = document.getElementById('seo-jsonld-script') as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'seo-jsonld-script';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    if (jsonLd) {
      scriptEl.textContent = JSON.stringify(jsonLd, null, 2);
    } else {
      // Default LocalBusiness & Organization JSON-LD
      const defaultSchema = [
        {
          "@context": "https://schema.org",
          "@type": "CarRental",
          "@id": "https://mrcarrentcm.com/#organization",
          "name": "MR Car Rent Chiang Mai - รถเช่าพร้อมคนขับเชียงใหม่",
          "alternateName": "เอ็มอาร์ คาร์เร้นท์ เชียงใหม่",
          "url": "https://mrcarrentcm.com/",
          "logo": "https://mrcarrentcm.com/images/logo.jpg",
          "image": "https://mrcarrentcm.com/images/logo.jpg",
          "telephone": "+66656455104",
          "email": "contact@mrcarrentcm.com",
          "priceRange": "฿1,200 - ฿2,500",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "208/36 ดอนแก้ววิลเลจ 7 ต.ดอนแก้ว",
            "addressLocality": "แม่ริม",
            "addressRegion": "เชียงใหม่",
            "postalCode": "50180",
            "addressCountry": "TH"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 18.9140,
            "longitude": 98.9650
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "06:00",
              "closes": "22:00"
            }
          ],
          "sameAs": [
            "https://facebook.com/mrcarrentchiangmai",
            "https://page.line.me/ahm7551c?openQrModal=true"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "184",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      ];
      scriptEl.textContent = JSON.stringify(defaultSchema, null, 2);
    }
  }, [title, description, canonicalUrl, keywords, ogImage, lang, hreflangTh, hreflangEn, jsonLd]);

  return null;
};
