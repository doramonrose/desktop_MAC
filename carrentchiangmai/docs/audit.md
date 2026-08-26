# Audit carrentchiangmai.com

อัปเดต: 26 สิงหาคม 2569

## Critical
- พบ credential แบบ plaintext ใน `public_html/readme.txt` — ลบจากชุด deploy แล้ว แต่เจ้าของต้องเปลี่ยนรหัสผ่านทันที
- HTML เดิมปิด `body` ก่อนเนื้อหา — แทนด้วย semantic HTML ที่ถูกต้อง
- ข้อมูลติดต่อในไฟล์สำเนาขัดแย้ง — ใช้ข้อมูลที่เจ้าของยืนยัน: 082-945-4005 และ @carrent-chiangmai
- นำเลขบัญชีธนาคารและสถิติ 90K+/9,999/999/99 ออกจากหน้าสาธารณะ
- ลิงก์ LINE เดิม `lin.ee/zuOYhY2` พาไป `@745njedr` ซึ่งขัดกับข้อมูลที่ยืนยัน จึงเปลี่ยนเป็นลิงก์ตรงของ `@carrent-chiangmai`

## High
- เดิมมีหน้าเดียว, H1 หลายตัว, ไม่มี schema/robots และ sitemap เก่า — สร้าง 21 URL, H1 เดียว, JSON-LD, robots และ sitemap ใหม่
- Analytics โหลดซ้ำ GTM/GA4/legacy — เหลือ GTM `GTM-PM5GHSP` เพียงทางเดียว
- ไฟล์ `index-.html` และ `index.html.moved` สร้าง duplicate/NAP conflict — ลบและตอบ 410
- `/stats/` อาจเปิดเผยข้อมูล operational — robots ปิด crawl; ต้องตรวจสิทธิ์ directory ระดับ hosting เพิ่ม

## Medium
- ภาพเดิมส่วนใหญ่ไม่มี alt และบางภาพอาจเป็น stock/ไม่มีหลักฐานสิทธิ์ — ไม่ใช้เป็นคำอ้างในเว็บใหม่จนยืนยัน
- ลิงก์ social ว่าง, Messenger ผิดรูปแบบ, modal/form ใช้งานไม่ได้ — แทนด้วย CTA จริงและ LINE quote flow
- Bootstrap+jQuery+carousels+font icon มี payload สูง — แทนด้วย CSS/JS แบบไม่มี dependency

## Low
- ภาษาเอกสารเดิมเป็น `en`, copy ปะปน, copyright เก่า และ meta keywords — แก้เป็นไทยและตัด metadata ที่ไม่เกิดประโยชน์

## URL/Equity ที่รักษา
- `/`, `/sitemap.xml`, `/google05178207dc5b0217.html`, `/img/*` และ Facebook `cnxrent`
- hash anchors `#home`, `#services`, `#blog`, `#portfolio`, `#team` ยังคงอยู่บนหน้าแรก
- canonical host ใช้ non-www และ redirect HTTPS/non-www 301
