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

1. Upload this folder to the document root.
2. PHP >= 8.2
3. Apache: `.htaccess` is included (HTTPS, security headers, `/sitemap.xml` → `sitemap.php`, 404).
4. Nginx: map `error_page 404 /404.php;` and `rewrite ^/sitemap.xml$ /sitemap.php last;`
5. Do not upload `node_modules/`.
6. Fill LINE and analytics in `config/business.php` when they exist. Leave LINE empty until the real OA URL is available.

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
