# เชียงใหม่พาไป — Phase 1 Production Site

บริการรถเช่าพร้อมคนขับเชียงใหม่  
Domain: https://chiangmaipapai.com/

Stack: PHP 8.2+ · Tailwind CSS · Vanilla JS · ไม่ใช้ฐานข้อมูล

---

## Deploy (Shared Hosting / VPS)

1. อัปโหลดไฟล์ทั้งหมดไปยัง document root (`public_html` หรือเทียบเท่า)
2. ตั้ง PHP >= 8.2
3. Apache: ใช้ `.htaccess` ที่มีอยู่ (HTTPS, security headers, compression, 404)
4. Nginx: ตั้ง `error_page 404 /404.php;` และ security headers ตามไฟล์ `.htaccess`
5. ไม่ต้องติดตั้ง Composer / Database
6. อย่าอัปโหลดโฟลเดอร์ `node_modules/` (ใช้สำหรับ build CSS เท่านั้น)

### Build CSS (ถ้าแก้สไตล์)

```bash
npm install
npm run build:css
```

---

## Config สำคัญ

| ไฟล์ | ใช้ทำอะไร |
|------|-----------|
| `config/business.php` | โทร / อีเมล / ที่อยู่ / LINE / บัญชี / Analytics / GBP URLs |
| `config/content.php` | บริการ / รถ / เส้นทาง / FAQ / จำนวนที่นั่ง |
| `config/seo.php` | Title, Description, Schema |
| `config/app.php` | Domain, asset version |

### เปิด LINE OA เมื่อพร้อม

```php
'line_id' => '@your-id',
'line_url' => 'https://line.me/R/ti/p/@your-id',
```

ปุ่มจะเปลี่ยนจาก `LINE OA เร็ว ๆ นี้` เป็นเปิด LINE อัตโนมัติ

### Google Business Profile

```php
'google_business_url' => '',
'google_review_url' => '',
'google_maps_url' => '',
```

ใส่เมื่อเปิด GBP จริง — NAP ต้องตรงกับเว็บทุกช่องทาง

### Analytics

ใส่ใน `config/business.php` → `analytics`:

- `gtm_id` (แนะนำ) หรือ `ga4_id`
- `meta_pixel_id`, `google_ads_id` (ถ้ามี)

Events พร้อมแล้ว: `click_phone`, `click_line`, `click_quote`, `select_vehicle`, `select_destination`, `copy_quote`, `view_payment`, `copy_bank_account`  
**ไม่ส่ง** ชื่อ / โทร / อีเมล / LINE ID

---

## โลโก้และภาพรถ

- โลโก้หลัก: `assets/images/logo.png`
- Favicon / Apple icon สร้างจาก `logo.png`
- ภาพรถจริง: แทนที่ไฟล์ใน `assets/images/vehicles/` ด้วยชื่อเดิม  
  (`chiangmai-sedan-with-driver.webp` / `.avif` / `.jpg`)
- Hero: `assets/images/chiangmai-car-with-driver.*`

---

## หลัง Deploy — Google Search Console

1. เพิ่ม Domain Property (`chiangmaipapai.com`)
2. Verify ผ่าน DNS
3. Submit `https://chiangmaipapai.com/sitemap.xml`
4. Request Index หน้า Homepage
5. ตรวจ Coverage / Indexing
6. ตรวจ Core Web Vitals
7. ตรวจ Search Queries
8. ตรวจ CTR
9. ปรับ Title ตามข้อมูลจริงจาก Search Console

---

## Phase 2 (เปิดแล้ว)

ลำดับที่เปิดใช้งาน:
1. `/car-with-driver-chiangmai/`
2. `/airport-transfer-chiangmai/`
3. `/destinations/mae-kampong/`
4. `/destinations/doi-inthanon/`
5. `/price/`
6. `/destinations/mon-jam/`
7. `/destinations/chiang-rai/`
8. `/destinations/pai/`
9. `/vehicles/van/`
10. `/reviews/`

เนื้อหาหน้าแก้ที่ `config/pages.php`  
หลังได้ลิงก์ Google Business ให้ใส่ใน `config/business.php`:

```php
'google_business_url' => 'https://...',
'google_review_url' => 'https://...',
'google_maps_url' => 'https://...',
```

---

## Phase ถัดไป (เปิดแล้ว)

- `/vehicles/sedan/` `/vehicles/suv/`
- `/destinations/doi-suthep/` `/destinations/chiang-dao/`
- `/about/` `/contact/` `/faq/`

---

## หลังจากนี้ (optional)

- เชื่อม Google Business / Reviews URL
- ขยายเส้นทางอื่นตาม Search Console
- ภาพรถจริงของแบรนด์เอง

### วิธีใส่ราคาจริง

แก้ไฟล์ `config/pricing.php`:

1. ใส่ตัวเลขใน `'from' => ...` (หน่วยบาท)
2. ตั้ง `'enabled' => true`
3. รีเฟรชหน้า `/price/` และหน้าบัตรรถ/เส้นทาง

ตัวอย่าง:
```php
'enabled' => true,
'vehicles' => [
  'sedan' => ['from' => 1500, 'unit' => 'เริ่มต้น', 'note' => '...'],
],
```

ถ้า `from` เป็น `null` หรือ `enabled` เป็น `false` ระบบจะแสดง **สอบถามราคา**

---

## Quality Notes

- Reviews section ซ่อนเมื่อยังไม่มีรีวิวจริง
- ไม่มีราคาแต่ง / rating / เคลมอันดับ
- Payment อยู่ในส่วนพับได้ ไม่อยู่ Hero/Header/CTA หลัก
- LocalBusiness Schema ไม่ใส่ Rating / Geo / OpeningHours / PriceRange
