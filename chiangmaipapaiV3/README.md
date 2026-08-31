# เชียงใหม่พาไป V3 — Chiang Mai Pa Pai

Brand-separated production site for https://chiangmaipapai.com/

Not a rebrand, mirror, or SEO extension of mrcarrentcm.com.

Stack: PHP 8.2+ · Tailwind CSS · Vanilla JS · no database

---

## Local

```bash
npm install
npm run build:css
php -S localhost:8080 router.php
```

## Deploy

Upload the site to the document root of chiangmaipapai.com (`public_html`).

1. Use `chiangmaipapaiV3-server.zip` (no `node_modules`).
2. PHP >= 8.2
3. Apache: `.htaccess` is included (`DirectoryIndex index.php`, HTTPS, `/sitemap.xml` → `sitemap.php`, 404).
4. Nginx: map `error_page 404 /404.php;` and `rewrite ^/sitemap.xml$ /sitemap.php last;`
5. Do not upload `node_modules/`, `package.json`, or `router.php`.
6. Delete any test `index.html` on the server. Apache serves `index.html` before `index.php`.
7. LINE Official is `@553jixof` in `config/business.php`.

## Config

| File | Purpose |
|------|---------|
| `config/business.php` | NAP, LINE, bank, analytics |
| `config/seo.php` | Titles and meta |
| `config/routes.php` | Destination content |
| `config/vehicles.php` | Vehicle copy and selector |
| `config/prices.php` | Confirmed prices only |
| `config/social.php` | Social URLs when they exist |

Do not invent prices, reviews, ratings, or LINE URLs.

## After go-live

1. Search Console domain property + submit sitemap
2. Google Business Profile name: เชียงใหม่พาไป
3. NAP must match website / Google / Facebook / LINE
4. First content priority: Mae Kampong → Airport → Doi Inthanon → Van
