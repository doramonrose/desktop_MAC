# Measurement และ KPI dashboard specification

## Events
- `click_phone`: คลิกลิงก์ `tel:`
- `click_line`: คลิก LINE พร้อม `placement` และ `page_path`
- `quote_submit`: ผ่าน validation และสร้างข้อความ LINE แล้ว
- `view_vehicle`: คลิกรายละเอียดรถ พร้อม `vehicle_name`
- `view_tour`: คลิกรายละเอียดทริป พร้อม `tour_name`
- `booking_complete`: ห้ามยิงจากเว็บไซต์อัตโนมัติ ต้อง import/ส่งจากระบบหลังเจ้าของยืนยันการจองจริง

Events ส่งเข้า `dataLayer`; ต้องตั้ง GA4 Event tags ใน GTM `GTM-PM5GHSP` และตรวจด้วย Preview/DebugView โดยไม่เก็บชื่อ เบอร์ หรือข้อความเส้นทางใน event parameters

## Dashboard
- Search Console: impressions, non-brand clicks, query/page, Top 10 keywords
- Google Business Profile: calls, website clicks, directions และข้อความตามข้อมูลที่ API/GBP ให้ได้
- GA4: LINE clicks, phone clicks, quote submissions, vehicle/tour views
- Booking source: confirmed bookings และมูลค่าจากระบบหลังบ้าน/ชีตที่จำกัดสิทธิ์
- Funnel: organic landing → CTA click → quote_submit → booking_complete

## เกณฑ์รายงาน
- รายสัปดาห์: tracking errors, leads, landing pages
- รายเดือน: non-brand trend, Top 10 coverage, GBP actions, conversion rate, confirmed bookings
- ห้ามตีความอันดับจาก location เดียว; ใช้ Search Console และเครื่องมือ rank tracking ที่ตั้งพื้นที่เชียงใหม่
