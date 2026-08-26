# QA report

วันที่ทดสอบ: 26 สิงหาคม 2569  
สภาพแวดล้อม: local static server, Chrome headless, Lighthouse 12.8.2

## ผล Lighthouse

- หน้าแรก: Performance 97, Accessibility 100, Best Practices 100, SEO 100
- Landing template `/tours/doi-inthanon/`: Performance 100, Accessibility 100, Best Practices 100, SEO 100
- หน้าแรก: LCP 2.4 วินาที, TBT 10 มิลลิวินาที, CLS 0
- Landing template: LCP 1.2 วินาที, TBT 10 มิลลิวินาที, CLS 0
- รายงานเต็ม: `lighthouse-home.json` และ `lighthouse-landing.json`

ผลนี้เป็น lab data บนเครื่อง ไม่ใช่ข้อมูลผู้ใช้จริง ค่า INP และ Core Web Vitals ภาคสนามต้องตรวจใน Search Console หลัง production มี traffic เพียงพอ

## Structural QA

สคริปต์ `scripts/qa_site.py` ตรวจ 21 หน้าที่ index ได้:

- ไฟล์และ URL ครบตาม IA
- title และ meta description ไม่ซ้ำ
- H1 หนึ่งรายการต่อหน้า
- canonical ตรงกับ non-www HTTPS
- JSON-LD parse ได้ทุกหน้า
- label ของ form controls ครบ
- internal links และ sitemap ไม่เสีย
- ไม่พบเลขบัญชี credential สถิติที่ไม่มีหลักฐาน หรือ `href="#"`
- JavaScript ผ่าน `node --check`; Python generator/QA ผ่าน compile

## Responsive QA

ทดสอบ viewport 360, 390, 768, 1024 และ 1440 px ด้วย browser emulation:

- `documentElement.scrollWidth` เท่ากับ viewport ทุกขนาด ไม่มี horizontal overflow
- Hero, CTA, price card, navigation และ sticky mobile CTA ปรับ layout ตาม breakpoint
- ภาพหลักฐานอยู่ใน `home-360.png`, `home-390.png`, `home-768.png`, `home-1024.png`, `home-1440.png`

## Accessibility

- Lighthouse Accessibility 100 สำหรับ homepage และ landing template
- มี skip link, semantic landmarks, keyboard focus, reduced-motion support และ control ขนาดอย่างน้อย 46 px
- contrast และ accessible name ที่ตรวจพบในรอบแรกได้รับการแก้แล้ว

## ต้องตรวจหลัง deploy

1. Rich Results Test และ Schema Validator ด้วย production URL
2. Redirect HTTP/www, security headers, 404/410 และ cache headers บน Apache จริง
3. Google Tag Manager Preview และ GA4 DebugView สำหรับทุก event
4. Google Search Console sitemap/canonical/index coverage
5. Field Core Web Vitals, INP และ mobile usability
6. LINE deep link บน iOS/Android และบัญชี LINE OA จริง
7. `booking_complete` จากข้อมูลยืนยันหลังบ้านเท่านั้น

ยังไม่มีการ deploy หรือแก้ production ตามข้อกำหนด
