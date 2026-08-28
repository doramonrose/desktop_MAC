#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate the production-ready static site without external dependencies."""

from __future__ import annotations

import html
import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public_html"
DOCS = ROOT / "docs"
DOMAIN = "https://carrentchiangmai.com"
BRAND_NAME = "CARENT Chiang Mai"
BRAND_NAME_TH = "รถเช่าพร้อมคนขับเชียงใหม่"
LOGO_PATH = "/img/logo_carrent.png"
PHONE = "082-945-4005"
PHONE_URI = "+66829454005"
LINE_ID = "@carrent-chiangmai"
LINE_FRIEND = "https://line.me/R/ti/p/%40carrent-chiangmai"
ADDRESS = "208/36 ตำบลดอนแก้ว อำเภอแม่ริม จังหวัดเชียงใหม่ 50180"
UPDATED = "26 สิงหาคม 2569"

VEHICLES = [
    # name, capacity, bags, price, href, image, alt
    ("รถเก๋ง City Car", "1–3 ท่าน", "สอบถามตามขนาดกระเป๋า", "1,000 บาท/วัน", "/chiang-mai-sedan-with-driver/", "/img/city.jpg", "ตัวอย่างรถเก๋ง City Car สีขาว"),
    ("รถเก๋งขนาดเล็ก", "ไม่เกิน 4 ท่าน", "สอบถามตามขนาดกระเป๋า", "1,200 บาท/วัน", "/chiang-mai-sedan-with-driver/", "/img/eco.jpg", "ตัวอย่างรถเก๋งขนาดเล็กสำหรับเดินทางในเมือง"),
    ("รถเก๋งขนาดกลาง", "ไม่เกิน 4 ท่าน", "สอบถามตามขนาดกระเป๋า", "1,300 บาท/วัน", "/chiang-mai-sedan-with-driver/", "/img/altis-fleet.jpg", "ตัวอย่างรถเก๋งขนาดกลางสำหรับครอบครัว"),
    ("รถ SUV", "ไม่เกิน 6 ท่าน", "จำนวนกระเป๋าขึ้นกับผู้โดยสาร", "1,500 บาท/วัน", "/chiang-mai-suv-with-driver/", "/img/suv-fleet.png", "ตัวอย่างรถ SUV สำหรับเส้นทางภูเขาและครอบครัว"),
    ("รถตู้ VIP", "ไม่เกิน 10 ท่าน", "แจ้งจำนวนและขนาดก่อนจอง", "1,600 บาท/วัน", "/chiang-mai-van-with-driver/", "/img/van1.jpg", "ตัวอย่างรถตู้สำหรับกลุ่มท่องเที่ยว"),
    ("รถผู้บริหาร", "ยืนยันตามรุ่นรถ", "ยืนยันตามรุ่นรถ", "5,000 บาท/วัน", "/chiang-mai-executive-car/", "/img/alphad.jpg", "ตัวอย่างรถผู้บริหารระดับพรีเมียม"),
]

TOURS = [
    ("ดอยอินทนนท์", "/tours/doi-inthanon/", "เริ่ม 2,200 บาท", "ยอดดอย อ่างกา พระมหาธาตุฯ และน้ำตกวชิรธาร"),
    ("แม่กำปอง", "/tours/mae-kampong/", "เริ่ม 1,800 บาท", "หมู่บ้านแม่กำปอง น้ำตก วัด และจุดแวะตามเส้นทาง"),
    ("ม่อนแจ่ม", "/tours/mon-jam/", "เริ่ม 1,800 บาท", "ม่อนแจ่ม สวนพฤกษศาสตร์ และจุดแวะแม่ริม"),
    ("ดอยสุเทพ", "/tours/doi-suthep/", "ขอราคาตามเส้นทาง", "ดอยสุเทพและสถานที่ใกล้เคียงตามเวลาที่ตกลง"),
    ("เชียงรายแบบไปเช้า–เย็นกลับ", "/tours/chiang-rai-day-trip/", "เริ่ม 2,600 บาท", "วัดร่องขุ่น วัดห้วยปลากั้ง บ้านดำ และวัดร่องเสือเต้น"),
    ("ดอยอ่างขาง", "/tours/doi-ang-khang/", "เริ่ม 2,800 บาท", "สถานีเกษตรหลวงอ่างขางและจุดแวะตามฤดูกาล"),
]

TOUR_IMAGES = {
    "/tours/doi-inthanon/": ("/img/trip6.jpg", "พระมหาธาตุบนดอยอินทนนท์ท่ามกลางวิวภูเขา"),
    "/tours/mae-kampong/": ("/img/trip4.jpg", "บ้านไม้และบรรยากาศหมู่บ้านแม่กำปอง"),
    "/tours/mon-jam/": ("/img/trip5.jpg", "ทุ่งดอกไม้บนภูเขาบริเวณม่อนแจ่ม"),
    "/tours/doi-suthep/": ("/img/wat-phra-that-doi-suthep.webp", "พระธาตุดอยสุเทพและสถาปัตยกรรมล้านนา"),
    "/tours/chiang-rai-day-trip/": ("/img/trip7.jpg", "วัดร่องขุ่น จังหวัดเชียงราย"),
    "/tours/doi-ang-khang/": ("/img/trip9.jpg", "ลานกางเต็นท์และทิวเขาบริเวณดอยอ่างขาง"),
}

PAGES = {
    "/car-with-driver-chiang-mai/": {
        "title": "รถเช่าพร้อมคนขับเชียงใหม่ เลือกรถตามจำนวนคน | CARENT Chiang Mai",
        "description": "รถเช่าพร้อมคนขับเชียงใหม่สำหรับเที่ยว รับส่ง และงานธุรกิจ เลือกรถตามจำนวนผู้โดยสาร เช็กรถว่างและขอราคาก่อนเดินทางทาง LINE",
        "h1": "รถเช่าพร้อมคนขับเชียงใหม่ เลือกรถและวางเส้นทางก่อนเดินทาง",
        "eyebrow": "บริการหลัก",
        "intro": "บริการรถพร้อมคนขับในเชียงใหม่สำหรับท่องเที่ยว รับส่ง และเดินทางไปจังหวัดภาคเหนือ แจ้งวัน จุดรับ–ส่ง จำนวนคน กระเป๋า และเส้นทาง เพื่อให้ทีมงานตรวจรถว่างและสรุปราคาก่อนชำระมัดจำ",
        "price": "รถรายวันเริ่มต้น 1,000 บาท",
        "duration": "ราคาทริปที่เผยแพร่เดิมให้บริการวันละ 10 ชั่วโมง ส่วนงานรายวันและค่าล่วงเวลาให้ยืนยันในใบสรุปราคาก่อนจอง",
        "include": "คนขับ และรายการที่ระบุในใบสรุปราคา; ทริปเหมาบางรายการรวมค่าน้ำมันตามตาราง",
        "exclude": "ค่าจอดรถ ค่าทางด่วน ค่าเข้าชม ค่าอาหาร และค่าใช้จ่ายอื่น หากไม่ได้ระบุว่ารวม",
        "suitable": "รถเก๋งเหมาะกับกลุ่มเล็ก, SUV สำหรับพื้นที่นั่งมากขึ้น, รถตู้สำหรับครอบครัวหรือกลุ่ม และรถผู้บริหารตามรุ่นที่ยืนยัน",
        "links": [("/chiang-mai-car-rental-prices/", "ดูราคาและเงื่อนไข"), ("/tours/", "เลือกโปรแกรมเที่ยว"), ("/faq/", "คำถามก่อนจอง")],
        "faqs": [
            ("ต้องแจ้งอะไรเพื่อขอราคา?", "แจ้งวันและเวลารับ จุดรับ–ส่ง เส้นทาง จำนวนผู้โดยสาร จำนวนกระเป๋า ประเภทรถ และจำนวนวัน"),
            ("เลือกรถอย่างไร?", "ใช้จำนวนผู้โดยสารและสัมภาระจริงเป็นหลัก ทีมงานจะยืนยันความเหมาะสมของรถก่อนจอง"),
            ("ราคายืนยันเมื่อใด?", "ทีมงานจะสรุปราคาและสิ่งที่รวม/ไม่รวมให้ตรวจสอบก่อนชำระมัดจำ"),
        ],
    },
    "/chiang-mai-airport-transfer/": {
        "title": "รถรับส่งสนามบินเชียงใหม่ จองรถตามจำนวนคนและกระเป๋า",
        "description": "ขอราคารถรับส่งสนามบินเชียงใหม่ไปโรงแรม บ้าน หรือจุดนัดหมาย แจ้งเที่ยวบิน จำนวนคนและกระเป๋า เช็กรถว่างทาง LINE",
        "h1": "รถรับส่งสนามบินเชียงใหม่ ไปโรงแรมและจุดหมายที่ตกลง",
        "eyebrow": "รับ–ส่ง",
        "intro": "บริการรถรับส่งสนามบินเชียงใหม่แบบจองล่วงหน้า เลือกรถตามจำนวนผู้โดยสารและสัมภาระ ราคาแตกต่างตามจุดส่ง เวลา และประเภทรถ จึงต้องขอราคาก่อนจอง",
        "price": "ขอราคาตามจุดรับ–ส่ง",
        "duration": "เวลาบริการเริ่มตามเวลานัดหมาย เงื่อนไขรอเที่ยวบินหรือรอผู้โดยสารต้องยืนยันก่อนจอง",
        "include": "รถพร้อมคนขับและเส้นทางตามที่ระบุในใบสรุปราคา",
        "exclude": "ค่าจอดรถหรือค่าใช้จ่ายเพิ่มเติม หากใบสรุปราคาไม่ได้ระบุว่ารวม",
        "suitable": "รถเก๋งสำหรับกลุ่มเล็ก; SUV หรือรถตู้เมื่อมีกระเป๋าหลายใบ โปรดแจ้งจำนวนและขนาดกระเป๋าจริง",
        "links": [("/chiang-mai-van-with-driver/", "รถตู้พร้อมคนขับ"), ("/chiang-mai-sedan-with-driver/", "รถเก๋งพร้อมคนขับ"), ("/contact/", "ข้อมูลติดต่อ")],
        "faqs": [
            ("ต้องแจ้งเลขเที่ยวบินหรือไม่?", "ควรแจ้งเที่ยวบิน วันที่ เวลา และอาคารผู้โดยสาร เพื่อยืนยันเวลานัดหมาย"),
            ("จุดนัดพบอยู่ที่ไหน?", "ทีมงานจะแจ้งจุดนัดพบที่ชัดเจนหลังยืนยันการจอง เนื่องจากพื้นที่รับผู้โดยสารอาจเปลี่ยนตามข้อกำหนดสนามบิน"),
            ("เที่ยวบินล่าช้าคิดค่าใช้จ่ายอย่างไร?", "ต้องยืนยันเงื่อนไขเวลารอและค่าใช้จ่ายกับทีมงานก่อนจอง"),
        ],
    },
    "/chiang-mai-sedan-with-driver/": {
        "title": "รถเก๋งพร้อมคนขับเชียงใหม่ เริ่ม 1,000 บาท/วัน",
        "description": "รถเก๋งพร้อมคนขับเชียงใหม่สำหรับ 1–4 ท่าน ราคาเริ่มต้น 1,000 บาทต่อวัน แจ้งเส้นทางและกระเป๋าเพื่อเช็กรถว่าง",
        "h1": "รถเก๋งพร้อมคนขับเชียงใหม่ สำหรับผู้เดินทาง 1–4 ท่าน",
        "eyebrow": "รถเก๋ง",
        "intro": "รถเก๋งพร้อมคนขับเหมาะกับผู้เดินทางคนเดียว คู่รัก และครอบครัวขนาดเล็ก ราคาเดิมเริ่ม 1,000 บาทต่อวัน โดยต้องยืนยันรุ่นรถ เส้นทาง ชั่วโมงบริการ และรายการค่าใช้จ่ายก่อนจอง",
        "price": "เริ่มต้น 1,000 บาท/วัน",
        "duration": "ชั่วโมงบริการและค่าล่วงเวลาต้องระบุในใบสรุปราคา",
        "include": "คนขับและการใช้รถตามเส้นทาง/เวลาที่ตกลง",
        "exclude": "ค่าน้ำมัน ค่าจอด ค่าทางด่วน ที่พักคนขับ และ OT เว้นแต่ระบุว่ารวม",
        "suitable": "รถเก๋ง City Car 1–3 ท่าน; รถเก๋งขนาดเล็กหรือกลางไม่เกิน 4 ท่าน จำนวนกระเป๋าต้องยืนยันก่อนจอง",
        "links": [("/chiang-mai-car-rental-prices/", "ตารางราคารถ"), ("/chiang-mai-airport-transfer/", "รับส่งสนามบิน"), ("/tours/doi-suthep/", "รถไปดอยสุเทพ")],
        "faqs": [
            ("เลือกรุ่นรถได้หรือไม่?", "แจ้งรุ่นหรือขนาดที่ต้องการได้ ทีมงานจะยืนยันรถที่ว่างก่อนจอง"),
            ("รถเก๋งขึ้นเส้นทางภูเขาได้ทุกเส้นทางหรือไม่?", "ความเหมาะสมขึ้นกับเส้นทาง สภาพอากาศ ผู้โดยสาร และสัมภาระ ต้องให้ทีมงานตรวจสอบก่อน"),
            ("ราคาเริ่มต้นรวมค่าน้ำมันหรือไม่?", "ราคาเหมาทริประบุว่ารวมน้ำมัน แต่ราคารายวันต้องยืนยันรายการรวม/ไม่รวมในใบสรุปราคา"),
        ],
    },
    "/chiang-mai-suv-with-driver/": {
        "title": "รถ SUV พร้อมคนขับเชียงใหม่ เริ่ม 1,500 บาท/วัน",
        "description": "รถ SUV พร้อมคนขับเชียงใหม่ รองรับไม่เกิน 6 ท่าน ราคาเริ่มต้น 1,500 บาทต่อวัน ขอราคาตามเส้นทางและสัมภาระ",
        "h1": "รถ SUV พร้อมคนขับเชียงใหม่ สำหรับครอบครัวและกลุ่มเล็ก",
        "eyebrow": "รถ SUV",
        "intro": "รถ SUV พร้อมคนขับรองรับผู้โดยสารได้ไม่เกิน 6 ท่านตามข้อมูลเดิม แต่พื้นที่กระเป๋าจะลดลงเมื่อมีผู้โดยสารเต็มจำนวน โปรดแจ้งจำนวนและขนาดสัมภาระเพื่อเลือกรถได้เหมาะสม",
        "price": "เริ่มต้น 1,500 บาท/วัน",
        "duration": "ชั่วโมงบริการและ OT ยืนยันตามเส้นทางก่อนจอง",
        "include": "คนขับและการใช้รถตามที่ตกลง; ราคาเหมาทริปที่แสดงในหน้าทริปรวมน้ำมัน",
        "exclude": "ค่าจอด ค่าทางด่วน ค่าเข้าชม อาหาร และรายการที่ไม่ได้ระบุว่ารวม",
        "suitable": "เหมาะกับครอบครัวหรือกลุ่มไม่เกิน 6 ท่าน โดยต้องเผื่อพื้นที่กระเป๋าและอุปกรณ์เด็ก",
        "links": [("/chiang-mai-van-with-driver/", "เปรียบเทียบรถตู้"), ("/tours/doi-inthanon/", "ทริปดอยอินทนนท์"), ("/chiang-mai-car-rental-prices/", "ดูราคา")],
        "faqs": [
            ("นั่ง 6 ท่านพร้อมกระเป๋าใหญ่ได้หรือไม่?", "อาจไม่เหมาะ ขึ้นกับรุ่นรถและขนาดกระเป๋า ควรส่งจำนวน/ขนาดกระเป๋าให้ทีมงานตรวจสอบ"),
            ("เลือก SUV สำหรับขึ้นดอยได้หรือไม่?", "ได้ในบางเส้นทาง แต่ต้องยืนยันสภาพเส้นทาง ฤดูกาล และรถที่ว่างก่อน"),
            ("มีคาร์ซีทหรือไม่?", "ยังไม่มีข้อมูลยืนยัน โปรดสอบถามและระบุอายุเด็กก่อนจอง"),
        ],
    },
    "/chiang-mai-van-with-driver/": {
        "title": "รถตู้เชียงใหม่พร้อมคนขับ รองรับไม่เกิน 10 ท่าน",
        "description": "รถตู้เชียงใหม่พร้อมคนขับสำหรับครอบครัวและกลุ่ม ราคาเริ่มต้น 1,600 บาทต่อวัน แจ้งจำนวนคนและกระเป๋าเพื่อขอราคา",
        "h1": "รถตู้เชียงใหม่พร้อมคนขับ สำหรับครอบครัวและกลุ่ม",
        "eyebrow": "รถตู้ VIP",
        "intro": "รถตู้พร้อมคนขับรองรับผู้โดยสารไม่เกิน 10 ท่านตามข้อมูลเดิม เหมาะกับครอบครัว กลุ่มเพื่อน และงานรับส่ง โปรดแจ้งสัมภาระจริงเพราะจำนวนที่นั่งสูงสุดไม่เท่ากับพื้นที่กระเป๋าสูงสุด",
        "price": "เริ่มต้น 1,600 บาท/วัน",
        "duration": "ทริปเหมาที่เผยแพร่เดิมใช้บริการวันละ 10 ชั่วโมง; งานอื่นและ OT ต้องยืนยันก่อนจอง",
        "include": "คนขับและรถตามเส้นทางที่ตกลง; ทริปที่มีราคาหน้าเว็บระบุว่ารวมน้ำมัน",
        "exclude": "ค่าจอด ค่าทางด่วน ค่าเข้าชม อาหาร ที่พักคนขับ และ OT หากไม่ได้ระบุว่ารวม",
        "suitable": "กลุ่มไม่เกิน 10 ท่าน; หากมีกระเป๋าใหญ่หลายใบให้แจ้งทีมงานเพื่อประเมินจำนวนที่นั่งใช้งานจริง",
        "links": [("/chiang-mai-airport-transfer/", "รับส่งสนามบิน"), ("/tours/chiang-rai-day-trip/", "ทริปเชียงราย"), ("/booking-policy/", "นโยบายการจอง")],
        "faqs": [
            ("รถตู้รับได้กี่ท่าน?", "ข้อมูลเดิมระบุไม่เกิน 10 ท่าน แต่จำนวนที่เหมาะสมขึ้นกับกระเป๋าและรุ่นรถ"),
            ("ราคาเริ่มต้นรวมค่าน้ำมันหรือไม่?", "ราคารายวันต้องยืนยัน ส่วนราคาเหมาทริปที่แสดงในหน้าทริประบุว่ารวมน้ำมันและคนขับ"),
            ("เดินทางข้ามจังหวัดได้หรือไม่?", "ให้บริการภาคเหนือ โดยต้องส่งเส้นทางและจำนวนวันเพื่อประเมินราคาและที่พักคนขับ"),
        ],
    },
    "/chiang-mai-executive-car/": {
        "title": "รถผู้บริหารพร้อมคนขับเชียงใหม่ ขอรุ่นรถและราคาก่อนจอง",
        "description": "บริการรถผู้บริหารพร้อมคนขับเชียงใหม่สำหรับรับส่งและงานธุรกิจ ราคาเดิมเริ่ม 5,000 บาทต่อวัน ยืนยันรุ่นและเงื่อนไขก่อนจอง",
        "h1": "รถผู้บริหารพร้อมคนขับเชียงใหม่ สำหรับงานรับส่งและธุรกิจ",
        "eyebrow": "รถผู้บริหาร",
        "intro": "บริการรถผู้บริหารพร้อมคนขับสำหรับรับส่งสนามบิน ประชุม และเดินทางตามกำหนดการ ราคาเดิมเริ่ม 5,000 บาทต่อวัน แต่รุ่นรถ ความจุ และสิ่งอำนวยความสะดวกต้องยืนยันเป็นลายลักษณ์อักษรก่อนจอง",
        "price": "เริ่มต้น 5,000 บาท/วัน",
        "duration": "กำหนดเวลาบริการ เวลารอ และ OT ในใบเสนอราคาก่อนจอง",
        "include": "รถและคนขับตามรุ่น/กำหนดการที่ยืนยัน",
        "exclude": "ค่าใช้จ่ายที่ไม่ได้ระบุในใบเสนอราคา เช่น ค่าจอด ทางด่วน หรือที่พักคนขับ",
        "suitable": "ลูกค้าธุรกิจ ผู้บริหาร และแขกที่ต้องการระบุรุ่นรถและกำหนดการชัดเจน",
        "links": [("/contact/", "ขอใบเสนอราคา"), ("/chiang-mai-airport-transfer/", "รับส่งสนามบิน"), ("/booking-policy/", "เงื่อนไขการจอง")],
        "faqs": [
            ("รับประกันรุ่นรถได้หรือไม่?", "ต้องให้ทีมงานยืนยันรุ่นรถที่ว่างในใบเสนอราคาก่อนชำระมัดจำ"),
            ("ออกเอกสารสำหรับบริษัทได้หรือไม่?", "ยังต้องยืนยันชื่อผู้ประกอบการและรูปแบบเอกสารกับทีมงานก่อนจอง"),
            ("รองรับหลายจุดนัดหมายหรือไม่?", "ส่งกำหนดการทั้งหมดเพื่อประเมินเวลาและราคาเป็นรายงาน"),
        ],
    },
}

TOUR_DETAILS = {
    "/tours/doi-inthanon/": ("รถไปดอยอินทนนท์พร้อมคนขับ ราคาเริ่ม 2,200 บาท", "รถไปดอยอินทนนท์พร้อมคนขับจากเชียงใหม่ โปรแกรมเดิมรวมยอดดอย อ่างกา พระมหาธาตุฯ บ้านแม่กลางหลวง น้ำตกวชิรธาร และจอมทอง โดยจุดแวะจริงต้องปรับตามเวลา ฤดูกาล และการเปิดพื้นที่", "2,200 บาท (รถเก๋ง), 2,800 บาท (SUV), 2,900 บาท (รถตู้)", "สูงสุดแดนสยาม ทางเดินอ่างกา พระมหาธาตุนภเมทนีดล–นภพลภูมิสิริ ตลาดชาวเขา โครงการหลวง บ้านแม่กลางหลวง น้ำตกวชิรธาร และวัดพระธาตุศรีจอมทอง"),
    "/tours/mae-kampong/": ("รถไปแม่กำปองพร้อมคนขับ ราคาเริ่ม 1,800 บาท", "รถไปแม่กำปองแบบเหมาพร้อมคนขับ โปรแกรมเดิมมีโครงการหลวงตีนตก หมู่บ้าน วัด น้ำตก และจุดแวะตามเส้นทาง บางจุดอาจต้องเปลี่ยนรถท้องถิ่นหรือขึ้นกับการเปิดให้บริการ", "1,800 บาท (รถเก๋งไฟฟ้า), 2,000 บาท (รถเก๋ง), 2,500 บาท (SUV/รถตู้)", "โครงการหลวงตีนตก หมู่บ้านแม่กำปอง วัดแม่กำปอง น้ำตก ผาน้ำลอด น้ำพุร้อนสันกำแพง และถ้ำเมืองออนตามเวลาที่ตกลง"),
    "/tours/mon-jam/": ("รถไปม่อนแจ่มพร้อมคนขับ ราคาเริ่ม 1,800 บาท", "เหมารถไปม่อนแจ่มจากเชียงใหม่ พร้อมเลือกจุดแวะแม่ริมตามเวลาที่ตกลง สถานที่และค่าเข้าชมอาจเปลี่ยนตามฤดูกาล จึงควรยืนยันเส้นทางก่อนเดินทาง", "1,800 บาท (รถเก๋งไฟฟ้า), 2,000 บาท (รถเก๋ง), 2,500 บาท (SUV/รถตู้)", "วัดป่าดาราภิรมย์ จุดชมวิวม่อนแจ่ม สวนพฤกษศาสตร์ น้ำตกแม่สา และจุดแวะตามเส้นทาง"),
    "/tours/doi-suthep/": ("รถไปดอยสุเทพพร้อมคนขับ วางเส้นทางตามเวลาที่มี", "รถไปดอยสุเทพจากสนามบิน โรงแรม หรือจุดนัดหมายในเชียงใหม่ เลือกต่อเส้นทางวัดอุโมงค์ ดอยคำ หรือราชพฤกษ์ได้ตามเวลาที่ตกลง ราคาต้องประเมินจากจุดรับและจำนวนจุดแวะ", "ขอราคาตามจุดรับ–ส่งและเส้นทาง", "ครูบาศรีวิชัย วัดพระธาตุดอยสุเทพ และสถานที่ใกล้เคียงตามแผนที่ยืนยัน"),
    "/tours/chiang-rai-day-trip/": ("รถเชียงใหม่ไปเชียงรายแบบไปเช้า–เย็นกลับ เริ่ม 2,600 บาท", "เหมารถจากเชียงใหม่ไปเชียงรายพร้อมคนขับ โปรแกรมสั้นเดิมครอบคลุมวัดและจุดเที่ยวหลัก การเดินทางใช้เวลาหลายชั่วโมงและควรเลือกจำนวนจุดแวะให้เหมาะกับเวลาจริง", "2,600 บาท (รถเก๋ง), 3,200 บาท (SUV), 3,400 บาท (รถตู้)", "น้ำพุร้อนแม่ขะจาน วัดแสงแก้วโพธิญาณ วัดร่องขุ่น ไร่สิงห์ วัดห้วยปลากั้ง บ้านดำ และวัดร่องเสือเต้นตามเวลาที่ตกลง"),
    "/tours/doi-ang-khang/": ("รถไปดอยอ่างขางพร้อมคนขับ ราคาเริ่ม 2,800 บาท", "เหมารถไปดอยอ่างขางจากเชียงใหม่ เส้นทางภูเขาและจุดชมดอกไม้ขึ้นกับฤดูกาล สภาพอากาศ และเวลาเปิดสถานที่ ควรยืนยันรถ จุดแวะ และเวลาออกเดินทางก่อนจอง", "2,800 บาท (รถเก๋ง), 3,900 บาท (SUV), 4,200 บาท (รถตู้)", "สถานีเกษตรหลวงอ่างขาง สวน 80 สวนบอนไซ สวนกุหลาบ แปลงผลไม้ ไร่ชา และจุดแวะตามฤดูกาล"),
}

for path, (h1, intro, price, route) in TOUR_DETAILS.items():
    slug = path.rstrip("/").split("/")[-1]
    name = h1.split("พร้อมคนขับ")[0].replace("รถ", "", 1).strip() or h1
    page_title = f"{h1} | {BRAND_NAME}"
    if path == "/tours/chiang-rai-day-trip/":
        page_title = "รถเชียงใหม่ไปเชียงรายพร้อมคนขับ เริ่ม 2,600 บาท"
    PAGES[path] = {
        "title": page_title,
        "description": intro[:155],
        "h1": h1,
        "eyebrow": "โปรแกรมเที่ยวแบบส่วนตัว",
        "intro": intro,
        "price": price,
        "duration": "ราคาโปรแกรมเดิมให้บริการวันละ 10 ชั่วโมง เวลาเริ่ม–จบและ OT ต้องยืนยันในใบสรุปราคาก่อนจอง",
        "include": "ค่าน้ำมันและคนขับตามข้อมูลราคาเดิมสำหรับโปรแกรมนี้",
        "exclude": "ค่าเข้าชม อาหาร ค่าจอด ค่าทางด่วน ค่าใช้จ่ายส่วนตัว และรายการที่ไม่ได้ระบุว่ารวม",
        "suitable": f"ผู้เดินทางที่ต้องการเที่ยว{slug.replace('-', ' ')}แบบส่วนตัว; เส้นทางเบื้องต้น: {route}",
        "links": [("/tours/", "โปรแกรมทั้งหมด"), ("/chiang-mai-car-rental-prices/", "เปรียบเทียบราคา"), ("/booking-policy/", "นโยบายการจอง")],
        "faqs": [
            ("ราคาโปรแกรมรวมอะไร?", "ราคาที่แสดงอ้างอิงข้อมูลเดิมซึ่งระบุว่ารวมค่าน้ำมันและคนขับ ให้ตรวจรายการสุดท้ายอีกครั้งก่อนชำระมัดจำ"),
            ("ต้องแวะครบทุกจุดหรือไม่?", "ไม่จำเป็น ควรจัดลำดับตามเวลาจริง ฤดูกาล และความสนใจ โดยยืนยันแผนกับทีมงานก่อนเดินทาง"),
            ("ค่าเข้าชมรวมแล้วหรือไม่?", "ยังไม่มีข้อมูลยืนยันว่ารวม จึงให้ถือว่าไม่รวมจนกว่าใบสรุปราคาจะระบุเป็นอย่างอื่น"),
        ],
    }

CSS = r"""
@font-face{font-family:"Kanit";font-style:normal;font-weight:400;font-display:swap;src:url("/assets/fonts/kanit-400-thai.woff2") format("woff2");unicode-range:U+02D7,U+0303,U+0331,U+0E01-0E5B,U+200C-200D,U+25CC}
@font-face{font-family:"Kanit";font-style:normal;font-weight:400;font-display:swap;src:url("/assets/fonts/kanit-400-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:"Kanit";font-style:normal;font-weight:500;font-display:swap;src:url("/assets/fonts/kanit-500-thai.woff2") format("woff2");unicode-range:U+02D7,U+0303,U+0331,U+0E01-0E5B,U+200C-200D,U+25CC}
@font-face{font-family:"Kanit";font-style:normal;font-weight:500;font-display:swap;src:url("/assets/fonts/kanit-500-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:"Kanit";font-style:normal;font-weight:600;font-display:swap;src:url("/assets/fonts/kanit-600-thai.woff2") format("woff2");unicode-range:U+02D7,U+0303,U+0331,U+0E01-0E5B,U+200C-200D,U+25CC}
@font-face{font-family:"Kanit";font-style:normal;font-weight:600;font-display:swap;src:url("/assets/fonts/kanit-600-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:"Kanit";font-style:normal;font-weight:700;font-display:swap;src:url("/assets/fonts/kanit-700-thai.woff2") format("woff2");unicode-range:U+02D7,U+0303,U+0331,U+0E01-0E5B,U+200C-200D,U+25CC}
@font-face{font-family:"Kanit";font-style:normal;font-weight:700;font-display:swap;src:url("/assets/fonts/kanit-700-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
:root{--ink:#132033;--navy:#16345a;--navy-deep:#0a1830;--gold:#c8963e;--gold-deep:#8f6818;--amber:#9a6b1c;--brand-magenta:#9d165c;--cream:#f4efe6;--sand:#ebe4d7;--paper:#fffdf9;--muted:#5a6878;--line:#e4ddd0;--line-dark:#c9c0b0;--ok:#1f6b4a;--line-green:#127a52;--radius:28px;--shadow:0 28px 70px rgba(10,24,48,.16);--max:1200px;--fs-body:1.0625rem;--fs-small:.875rem;--fs-lead:1.125rem;--fs-h1:clamp(1.85rem,3vw,2.55rem);--fs-h2:clamp(1.55rem,2.5vw,2.15rem);--fs-h3:1.15rem;--fs-brand:1.2rem;--lh-tight:1.28;--lh-body:1.7}
*{box-sizing:border-box}html{scroll-behavior:smooth;max-width:100%;overflow-x:hidden}body{margin:0;max-width:100%;overflow-x:hidden;color:var(--ink);background:var(--paper);font-family:"Kanit",Tahoma,sans-serif;font-size:var(--fs-body);line-height:var(--lh-body);font-weight:400;-webkit-font-smoothing:antialiased}body.nav-open{overflow:hidden}h1,h2,h3,h4{font-weight:700;line-height:var(--lh-tight);color:var(--navy-deep)}
img{display:block;max-width:100%;height:auto}a{color:var(--navy);text-underline-offset:3px}a:hover{color:var(--gold)}button,input,select,textarea{font:inherit}
.skip-link{position:absolute;left:1rem;top:-5rem;background:#fff;color:#000;padding:.7rem 1rem;z-index:1000}.skip-link:focus{top:1rem}
:focus-visible{outline:3px solid #e8c57a;outline-offset:3px}.container{width:min(calc(100% - 2rem),var(--max));margin-inline:auto}.narrow{max-width:760px}
.site-header{position:sticky;top:0;z-index:100;background:rgba(255,253,249,.9);border-bottom:1px solid rgba(19,32,51,.08);backdrop-filter:blur(18px)}
.nav-wrap{min-height:84px;display:flex;align-items:center;gap:1.1rem;min-width:0}.brand{display:flex;align-items:center;gap:.8rem;min-width:0;text-decoration:none;font-weight:700;line-height:1.15;color:var(--ink)}.brand-logo{flex:0 0 auto;width:58px;height:58px;object-fit:contain;border-radius:14px;background:#fff;box-shadow:0 10px 24px rgba(13,35,66,.14)}.brand-text{min-width:0}.brand-text strong{display:block;font-size:var(--fs-brand);letter-spacing:.04em;color:var(--brand-magenta);text-transform:uppercase}.brand small{display:block;color:var(--muted);font-weight:500;font-size:var(--fs-small);letter-spacing:0;margin-top:.12rem}
.nav-toggle{display:none;flex:0 0 auto;margin-left:auto;background:#fff;border:1px solid var(--line-dark);border-radius:999px;padding:.55rem .9rem;font-weight:600}.site-nav{margin-left:auto;display:flex;align-items:center;gap:1.1rem}.site-nav a{text-decoration:none;font-weight:500;font-size:.98rem;color:var(--ink)}.site-nav a:not(.btn):hover{color:var(--brand-magenta)}.site-nav .btn{color:#fff}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;min-height:50px;padding:.78rem 1.35rem;border:1.5px solid transparent;border-radius:999px;background:var(--gold-deep);color:#fff;text-decoration:none;font-weight:700;font-size:1rem;letter-spacing:.01em;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease,background .2s ease}.btn:hover{background:#745214;color:#fff;transform:translateY(-1px);box-shadow:0 12px 28px rgba(116,82,20,.28)}.btn-secondary{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.7);color:#fff;backdrop-filter:blur(8px);font-weight:600}.btn-secondary:hover{background:#fff;color:var(--navy-deep)}.btn-line{background:var(--line-green)}.btn-line:hover{background:#0e5f40}.btn-ghost{background:#fff;border-color:rgba(19,32,51,.14);color:var(--navy)}.btn-ghost:hover{background:var(--navy);color:#fff}.btn-small{min-height:44px;padding:.55rem 1rem;font-size:.94rem}.text-link{font-weight:700;text-decoration:none;color:var(--navy)}.text-link:hover{color:var(--brand-magenta);text-decoration:underline}
.eyebrow{display:inline-flex;align-items:center;gap:.55rem;text-transform:uppercase;letter-spacing:.16em;font-weight:700;color:var(--amber);font-size:.72rem}.eyebrow:before{content:"";width:28px;height:1.5px;background:currentColor;opacity:.8}
.hero{position:relative;min-height:min(92vh,820px);display:grid;align-items:end;color:#fff;overflow:hidden;isolation:isolate}.hero-bg{position:absolute;inset:0;z-index:-2}.hero-bg img{width:100%;height:100%;object-fit:cover;transform:scale(1.02)}.hero:after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(105deg,rgba(8,18,34,.78) 8%,rgba(8,18,34,.42) 46%,rgba(8,18,34,.18) 100%),linear-gradient(0deg,rgba(8,18,34,.55),transparent 42%)}
.hero-inner{width:min(calc(100% - 2rem),var(--max));margin:0 auto;padding:clamp(5.5rem,12vw,8.5rem) 0 clamp(3.5rem,7vw,5rem);display:grid;grid-template-columns:minmax(0,1.05fr) minmax(280px,.7fr);gap:clamp(1.5rem,4vw,3.5rem);align-items:end}
.hero .eyebrow{color:#f0d59a}.hero h1{font-size:var(--fs-h1);font-weight:600;line-height:1.32;letter-spacing:0;margin:.55rem 0 .9rem;max-width:18rem;text-wrap:balance;color:#fff;text-shadow:0 2px 18px rgba(8,18,34,.28)}.hero-lead{font-size:var(--fs-lead);line-height:1.65;color:rgba(255,255,255,.9);max-width:38rem;margin:0;font-weight:400}.hero-actions{display:flex;flex-wrap:wrap;gap:.8rem;margin:1.6rem 0 .95rem}.microcopy{font-size:var(--fs-small);color:rgba(255,255,255,.78);margin:0;line-height:1.55}
.price-panel{background:rgba(255,253,249,.96);color:var(--ink);border-radius:24px;padding:1.4rem 1.45rem;box-shadow:var(--shadow);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.55)}.price-panel .eyebrow{color:var(--amber)}.price-panel .eyebrow:before{display:none}.price-panel strong{display:block;font-size:clamp(1.45rem,2.4vw,1.95rem);line-height:1.25;color:var(--navy-deep);margin-top:.4rem}.price-panel strong em,.price-panel .price-accent{color:var(--brand-magenta);font-style:normal}.check-list{list-style:none;padding:0;margin:.9rem 0 1.05rem}.check-list li{padding:.35rem 0 .35rem 1.5rem;position:relative;font-size:.95rem;color:var(--muted);line-height:1.5}.check-list li:before{content:"✓";position:absolute;left:0;color:var(--ok);font-weight:700}
.trust-strip{background:#fff;border-bottom:1px solid var(--line)}.trust-grid{display:grid;grid-template-columns:repeat(4,1fr)}.trust-item{padding:1.45rem 1rem;text-align:center;font-weight:700;font-size:1rem;color:var(--navy-deep);border-right:1px solid var(--line)}.trust-item:last-child{border-right:0}.trust-item span{display:block;margin-top:.3rem;font-size:var(--fs-small);color:var(--muted);font-weight:400;line-height:1.45}
section{padding:clamp(4.2rem,8vw,7.2rem) 0}.section-soft{background:linear-gradient(180deg,#f7f2e9,#f3eee4)}.section-head{display:flex;justify-content:space-between;gap:2rem;align-items:end;margin-bottom:2.4rem}.section-head h2{font-size:var(--fs-h2);font-weight:600;line-height:1.35;letter-spacing:0;margin:.4rem 0 0;max-width:20rem;color:var(--navy-deep)}.section-head p{max-width:34rem;color:var(--muted);margin:0;font-size:1.02rem;line-height:1.65}
.grid{display:grid;gap:1.2rem}.grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}
.card{background:#fff;border:1px solid rgba(19,32,51,.06);border-radius:var(--radius);padding:1.45rem;box-shadow:0 14px 36px rgba(10,24,48,.06);transition:transform .25s ease,box-shadow .25s ease}.card:hover{transform:translateY(-4px);box-shadow:0 22px 48px rgba(10,24,48,.12)}.card h3{margin:.4rem 0 .5rem;font-size:var(--fs-h3);line-height:1.3;color:var(--navy-deep)}.card p{color:var(--muted);margin:.25rem 0;line-height:1.55}.card .price{color:var(--amber);font-size:1.22rem;font-weight:700;letter-spacing:.01em}.card-footer{display:flex;justify-content:space-between;gap:.75rem;align-items:center;margin-top:1.1rem;padding-top:1rem;border-top:1px solid var(--line)}.badge{display:inline-flex;border-radius:999px;background:#eef3f8;color:var(--navy);padding:.32rem .72rem;font-size:.72rem;font-weight:700;letter-spacing:.02em}
.vehicle-card{position:relative;overflow:hidden;padding:0;background:#fff}.vehicle-media{display:grid;place-items:center;aspect-ratio:16/10;background:#fff;padding:.85rem 1rem .35rem;overflow:hidden}.vehicle-media--dark{background:linear-gradient(180deg,#1a2433,#0d1522)}.vehicle-media img{width:100%;height:100%;object-fit:contain;object-position:center bottom;transition:transform .4s ease}.vehicle-card:hover .vehicle-media img{transform:scale(1.04)}.vehicle-card-body{position:relative;padding:1.05rem 1.35rem 1.35rem;background:#fff}.vehicle-index{position:absolute;top:1rem;right:1.15rem;color:#8b97a8;font-size:1.85rem;font-weight:700;line-height:1;z-index:1;opacity:.55}.vehicle-note{font-size:.8rem;color:var(--muted);margin:.9rem 0 0}
.tour-mosaic{display:grid;grid-template-columns:1.35fr 1fr 1fr;grid-template-rows:auto auto;gap:1.15rem}.tour-card{position:relative;padding:0;overflow:hidden;min-height:280px;isolation:isolate}.tour-card.featured{grid-row:1 / span 2;min-height:100%}.tour-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .55s ease}.tour-card:hover img{transform:scale(1.06)}.tour-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,18,34,.05),rgba(8,18,34,.72) 72%);z-index:1}.tour-card-body{position:relative;z-index:2;height:100%;min-height:280px;display:flex;flex-direction:column;justify-content:flex-end;padding:1.35rem;color:#fff}.tour-card.featured .tour-card-body{min-height:560px;padding:1.7rem}.tour-card .badge{background:rgba(255,255,255,.18);color:#fff;backdrop-filter:blur(8px)}.tour-card h2,.tour-card h3{color:#fff;font-size:1.4rem;line-height:1.25;margin:.55rem 0 .4rem}.tour-card h2 a,.tour-card h3 a{color:inherit;text-decoration:none}.tour-card.featured h2,.tour-card.featured h3{font-size:clamp(1.75rem,2.5vw,2.35rem)}.tour-card p{color:rgba(255,255,255,.86);line-height:1.5}.tour-card .price{color:#f4d798;font-size:1.22rem;font-weight:700}.tour-card .card-footer{border-top-color:rgba(255,255,255,.18)}.tour-card .text-link,.tour-card .btn-small{color:#fff}.tour-card .btn-small{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.35)}.tour-card .btn-small:hover{background:#fff;color:var(--navy-deep)}
.facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.fact{border-left:4px solid var(--gold);padding:1.1rem 1.25rem;background:#fff;border-radius:0 18px 18px 0;box-shadow:0 10px 28px rgba(10,24,48,.05)}.fact h2,.fact h3{margin:0 0 .35rem;font-size:1.05rem}.fact p{margin:0;color:var(--muted)}
.table-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--radius);background:#fff;box-shadow:0 12px 30px rgba(10,24,48,.05)}table{border-collapse:collapse;width:100%;min-width:690px}th,td{padding:1.05rem 1.15rem;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}th{background:#f7f2e9;color:var(--navy)}tr:last-child td{border-bottom:0}
.steps{counter-reset:step}.step{position:relative;padding:1.5rem 1.4rem 1.5rem 4.6rem;background:#fff}.step:before{counter-increment:step;content:counter(step);position:absolute;left:1.25rem;top:1.45rem;display:grid;place-items:center;width:2.55rem;height:2.55rem;border-radius:50%;background:linear-gradient(145deg,#dfb45d,#b9852d);color:#1f271f;font-weight:700;box-shadow:0 10px 22px rgba(185,133,45,.28)}
.gallery-strip{display:grid;grid-template-columns:1.4fr .9fr .9fr;gap:1rem}.gallery-item{position:relative;overflow:hidden;border-radius:var(--radius);min-height:240px;box-shadow:0 18px 40px rgba(10,24,48,.1)}.gallery-item img{width:100%;height:100%;object-fit:cover;min-height:240px;transition:transform .5s ease}.gallery-item:hover img{transform:scale(1.04)}.gallery-item.tall{min-height:320px}.gallery-item.tall img{min-height:320px}
.breadcrumbs{padding:1rem 0;font-size:.9rem;color:var(--muted)}.breadcrumbs ol{list-style:none;display:flex;gap:.45rem;flex-wrap:wrap;margin:0;padding:0}.breadcrumbs li+li:before{content:"/";margin-right:.45rem;color:#8c9994}
.faq-list{display:grid;gap:.75rem}.faq-list details{border:1px solid var(--line);border-radius:18px;background:#fff;padding:1rem 1.15rem;box-shadow:0 8px 22px rgba(10,24,48,.04)}.faq-list summary{cursor:pointer;font-weight:700}.faq-list p{margin:.75rem 0 0;color:var(--muted)}
.quote-layout{display:grid;grid-template-columns:.75fr 1.25fr;gap:2rem;align-items:start}.quote-copy{position:sticky;top:100px}.quote-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.field{display:grid;gap:.35rem}.field-full{grid-column:1/-1}.field label,.field legend{font-weight:600}.field input,.field select,.field textarea{width:100%;border:1px solid var(--line-dark);border-radius:14px;padding:.8rem .9rem;background:#fff;transition:border-color .2s ease,box-shadow .2s ease}.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:#c8963e;box-shadow:0 0 0 4px rgba(200,150,62,.16)}.field textarea{min-height:110px;resize:vertical}.consent{display:flex;align-items:flex-start;gap:.6rem}.consent input{width:1.1rem;height:1.1rem;margin-top:.25rem}.form-status{min-height:1.5rem;color:var(--ok);font-weight:600}
.notice{border:1px solid #e6d3a4;background:#fff8e8;border-radius:18px;padding:1rem 1.2rem}.notice strong{color:#704b14}.link-list{display:flex;flex-wrap:wrap;gap:.7rem}.link-pill{border:1px solid var(--line-dark);border-radius:999px;padding:.55rem .9rem;text-decoration:none;font-weight:600;background:#fff}
.site-footer{background:linear-gradient(180deg,#12263f,#0a1830);color:#d7e0ea;padding:3.4rem 0 6.2rem}.footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:2rem}.site-footer h2,.site-footer h3{color:#fff}.site-footer a{color:#fff}.site-footer ul{list-style:none;padding:0}.site-footer li{margin:.45rem 0}.footer-brand{margin-bottom:1rem;color:#fff}.footer-brand .brand-text strong{color:#fff}.footer-brand .brand-text small{color:#9aabbc}.footer-brand .brand-logo{background:#fff}.legal{border-top:1px solid rgba(255,255,255,.12);margin-top:2rem;padding-top:1.2rem;color:#9aabbc;font-size:.88rem}
.mobile-cta{display:none;position:fixed;left:0;right:0;bottom:0;z-index:90;background:rgba(255,253,249,.96);border-top:1px solid var(--line);padding:.55rem;gap:.55rem;backdrop-filter:blur(12px)}.mobile-cta .btn{flex:1}
.page-hero{position:relative;overflow:hidden;padding:clamp(3.8rem,8vw,5.8rem) 0;background:linear-gradient(135deg,#0d213b,#16355c);color:#fff}.page-hero:before{content:"";position:absolute;inset:auto -10% -40% auto;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(200,150,62,.22),transparent 70%)}.page-hero h1{font-size:clamp(1.75rem,3vw,2.4rem);font-weight:600;line-height:1.32;margin:.5rem 0 .9rem;letter-spacing:0;max-width:22rem;color:#fff}.page-hero p{font-size:var(--fs-lead);line-height:1.65;max-width:46rem;color:rgba(255,255,255,.88)}.page-hero .price-callout{display:inline-block;margin-top:1rem;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;padding:.7rem 1.05rem;border-radius:999px;font-weight:700;backdrop-filter:blur(8px)}.page-hero .eyebrow{color:#f0d59a}.page-hero .btn-secondary{border-color:rgba(255,255,255,.55);color:#fff}
.placeholder-media{min-height:240px;border:1px dashed var(--line-dark);border-radius:var(--radius);display:grid;place-items:center;text-align:center;padding:2rem;background:linear-gradient(180deg,#fbf8f2,#f3eee4);color:var(--muted)}.contact-box{font-style:normal}.contact-box p{margin:.4rem 0}
@media(max-width:980px){.nav-toggle{display:block}.site-nav{display:none;position:fixed;top:78px;left:0;right:0;bottom:0;background:#fffdf9;padding:1.5rem;flex-direction:column;align-items:stretch}.site-nav.open{display:flex}.hero-inner,.quote-layout,.tour-mosaic,.gallery-strip{grid-template-columns:1fr}.tour-card.featured{grid-row:auto}.tour-card.featured .tour-card-body{min-height:360px}.quote-copy{position:static}.grid-3{grid-template-columns:repeat(2,minmax(0,1fr))}.trust-grid{grid-template-columns:repeat(2,1fr)}.trust-item:nth-child(2){border-right:0}.trust-item:nth-child(-n+2){border-bottom:1px solid var(--line)}.footer-grid{grid-template-columns:1fr 1fr}.section-head{align-items:start;flex-direction:column}}
@media(max-width:620px){.container{width:min(calc(100% - 1.2rem),var(--max))}.brand-logo{width:48px;height:48px}.brand-text strong{font-size:1.02rem}.brand-text small{font-size:.72rem}.grid-2,.grid-3,.facts,.quote-form,.footer-grid,.gallery-strip{grid-template-columns:1fr}.field-full{grid-column:auto}.hero{min-height:auto}.hero-inner{padding:5.2rem 0 2.6rem}.hero h1{font-size:clamp(1.7rem,7vw,2.15rem);max-width:none;line-height:1.32;font-weight:600}.hero-lead{font-size:1.05rem}.hero-actions{flex-direction:column;align-items:stretch}.hero-actions .btn{width:100%}.price-panel{margin-top:.4rem}.price-panel strong{font-size:1.35rem}.trust-item{padding:1rem .4rem;font-size:.9rem}.section-head{margin-bottom:1.5rem}.section-head h2{max-width:none}.tour-card,.tour-card-body{min-height:250px}.mobile-cta{display:flex}.site-footer{padding-bottom:7rem}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation-duration:.01ms!important;transition-duration:.01ms!important}.btn:hover,.card:hover{transform:none}}
"""

JS = r"""
(() => {
  const dataLayer = window.dataLayer = window.dataLayer || [];
  const track = (event, params = {}) => dataLayer.push({ event, ...params });
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  }
  document.addEventListener('click', e => {
    const phone = e.target.closest('a[href^="tel:"]');
    const line = e.target.closest('[data-line]');
    const vehicle = e.target.closest('[data-vehicle]');
    const tour = e.target.closest('[data-tour]');
    if (phone) track('click_phone', { link_url: phone.href, page_path: location.pathname });
    if (line) track('click_line', { link_url: line.href, page_path: location.pathname, placement: line.dataset.placement || 'content' });
    if (vehicle) track('view_vehicle', { vehicle_name: vehicle.dataset.vehicle, page_path: location.pathname });
    if (tour) track('view_tour', { tour_name: tour.dataset.tour, page_path: location.pathname });
  });
  const form = document.querySelector('#quote-form');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const f = new FormData(form);
      const message = [
        'สวัสดีค่ะ ต้องการสอบถามรถพร้อมคนขับ',
        `วันที่ ${f.get('pickup_date') || '…'} เวลา ${f.get('pickup_time') || '…'}`,
        `จำนวน ${f.get('passengers') || '…'} ท่าน กระเป๋า ${f.get('luggage') || '…'} ใบ`,
        `รับที่ ${f.get('pickup') || '…'}`,
        `ส่งที่ ${f.get('dropoff') || '…'}`,
        `เส้นทาง/สถานที่ ${f.get('route') || '…'}`,
        `ประเภทรถ ${f.get('vehicle') || 'ให้ทีมงานแนะนำ'} จำนวน ${f.get('days') || '1'} วัน`,
        `ชื่อ ${f.get('name') || '…'} ติดต่อ ${f.get('contact') || '…'}`
      ].join('\n');
      const url = `https://line.me/R/oaMessage/%40carrent-chiangmai/?${encodeURIComponent(message)}`;
      track('quote_submit', { form_name: 'line_quote', vehicle_type: f.get('vehicle'), page_path: location.pathname });
      status.textContent = 'กำลังเปิด LINE กรุณาตรวจข้อความแล้วกดส่งให้ทีมงาน';
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        navigator.clipboard?.writeText(message);
        status.textContent = 'เบราว์เซอร์ปิดกั้นหน้าต่างใหม่ เราคัดลอกข้อความแล้ว กรุณาเปิด LINE และวางข้อความ';
      }
    });
  }
})();
"""

def esc(value: str) -> str:
    return html.escape(value, quote=True)

def url(path: str) -> str:
    return f"{DOMAIN}{path}"

def nav_html() -> str:
    return f"""
<a class="skip-link" href="#main">ข้ามไปเนื้อหาหลัก</a>
<header class="site-header">
  <div class="container nav-wrap">
    <a class="brand" href="/">
      <img class="brand-logo" src="{LOGO_PATH}" width="58" height="58" alt="โลโก้ {BRAND_NAME}" decoding="async">
      <span class="brand-text"><strong>{BRAND_NAME}</strong><small>{BRAND_NAME_TH}</small></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">เมนู</button>
    <nav class="site-nav" id="site-nav" aria-label="เมนูหลัก">
      <a href="/car-with-driver-chiang-mai/">บริการรถ</a>
      <a href="/chiang-mai-car-rental-prices/">ราคา</a>
      <a href="/tours/">โปรแกรมเที่ยว</a>
      <a href="/faq/">คำถาม</a>
      <a href="/contact/">ติดต่อ</a>
      <a class="btn btn-small btn-line" data-line data-placement="header" href="{LINE_FRIEND}" target="_blank" rel="noopener noreferrer">เช็กรถว่างทาง LINE</a>
    </nav>
  </div>
</header>"""

def footer_html() -> str:
    return f"""
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand footer-brand" href="/">
          <img class="brand-logo" src="{LOGO_PATH}" width="58" height="58" alt="โลโก้ {BRAND_NAME}" loading="lazy" decoding="async">
          <span class="brand-text"><strong>{BRAND_NAME}</strong><small>{BRAND_NAME_TH}</small></span>
        </a>
        <p>รถพร้อมคนขับในเชียงใหม่และภาคเหนือ ตรวจรถว่างและสรุปราคาก่อนชำระมัดจำ</p>
        <address class="contact-box"><p>{ADDRESS}</p><p><a href="tel:{PHONE_URI}">{PHONE}</a></p><p>LINE: {LINE_ID}</p></address>
      </div>
      <div><h3>บริการ</h3><ul><li><a href="/car-with-driver-chiang-mai/">รถพร้อมคนขับ</a></li><li><a href="/chiang-mai-airport-transfer/">รับส่งสนามบิน</a></li><li><a href="/chiang-mai-car-rental-prices/">ราคา</a></li><li><a href="/tours/">โปรแกรมเที่ยว</a></li></ul></div>
      <div><h3>ข้อมูลสำคัญ</h3><ul><li><a href="/about/">เกี่ยวกับเรา</a></li><li><a href="/reviews/">รีวิวที่ตรวจสอบได้</a></li><li><a href="/booking-policy/">นโยบายการจอง</a></li><li><a href="/privacy-policy/">นโยบายความเป็นส่วนตัว</a></li></ul></div>
    </div>
    <div class="legal">อัปเดต {UPDATED} · ราคาต้องยืนยันตามวัน รถ และเส้นทางก่อนจอง · ไม่มีการแสดงเลขบัญชีธนาคารบนเว็บไซต์สาธารณะ</div>
  </div>
</footer>
<div class="mobile-cta" aria-label="ติดต่อด่วน"><a class="btn btn-secondary" href="tel:{PHONE_URI}">โทร {PHONE}</a><a class="btn btn-line" data-line data-placement="sticky" href="{LINE_FRIEND}" target="_blank" rel="noopener noreferrer">LINE</a></div>"""

def schema_base(path: str, page: dict, breadcrumb: list[tuple[str, str]], faqs=None) -> str:
    graphs = [{
        "@type": "LocalBusiness",
        "@id": f"{DOMAIN}/#business",
        "name": BRAND_NAME,
        "alternateName": ["Car Rent Chiang Mai", "CARENT CHIANGMAI", BRAND_NAME_TH],
        "image": f"{DOMAIN}{LOGO_PATH}",
        "logo": f"{DOMAIN}{LOGO_PATH}",
        "url": DOMAIN,
        "telephone": PHONE_URI,
        "address": {"@type": "PostalAddress", "streetAddress": "208/36", "addressLocality": "ดอนแก้ว อำเภอแม่ริม", "addressRegion": "เชียงใหม่", "postalCode": "50180", "addressCountry": "TH"},
        "areaServed": ["เชียงใหม่", "เชียงราย", "ลำพูน", "ลำปาง", "แม่ฮ่องสอน", "ภาคเหนือ"],
        "sameAs": ["https://www.facebook.com/cnxrent", LINE_FRIEND],
    }, {
        "@type": "WebPage",
        "@id": f"{url(path)}#webpage",
        "url": url(path),
        "name": page["title"],
        "description": page["description"],
        "inLanguage": "th-TH",
        "about": {"@id": f"{DOMAIN}/#business"},
    }, {
        "@type": "BreadcrumbList",
        "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": name, "item": url(href)} for i, (name, href) in enumerate(breadcrumb)]
    }]
    if path not in ("/", "/about/", "/reviews/", "/faq/", "/contact/", "/booking-policy/", "/privacy-policy/"):
        graphs.append({"@type": "Service", "name": page["h1"], "description": page["intro"], "provider": {"@id": f"{DOMAIN}/#business"}, "areaServed": {"@type": "AdministrativeArea", "name": "ภาคเหนือ"}})
    if faqs:
        graphs.append({"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]})
    return json.dumps({"@context": "https://schema.org", "@graph": graphs}, ensure_ascii=False, separators=(",", ":"))

def head_html(path: str, page: dict, schema: str) -> str:
    return f"""<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{esc(page['title'])}</title>
  <meta name="description" content="{esc(page['description'])}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="{url(path)}">
  <meta property="og:type" content="website"><meta property="og:locale" content="th_TH">
  <meta property="og:title" content="{esc(page['title'])}"><meta property="og:description" content="{esc(page['description'])}">
  <meta property="og:url" content="{url(path)}">  <meta property="og:image" content="{DOMAIN}{LOGO_PATH}">
  <meta property="og:image:alt" content="โลโก้ {BRAND_NAME}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="google-site-verification" content="eIMKWObm7VMunfybuUYEO7P71fYaRC-G-f1Wdwv6_WQ">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="preconnect" href="https://www.googletagmanager.com">
  <link rel="preload" href="/assets/fonts/kanit-700-thai.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/css/site.css">
  <script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{'gtm.start':new Date().getTime(),event:'gtm.js'}});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}})(window,document,'script','dataLayer','GTM-PM5GHSP');</script>
  <script type="application/ld+json">{schema}</script>
</head>
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PM5GHSP" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>
{nav_html()}"""

def quote_form() -> str:
    return f"""
<section id="quote" class="section-soft">
  <div class="container quote-layout">
    <div class="quote-copy"><span class="eyebrow">ขอราคาโดยไม่ส่งข้อมูลเข้าระบบเว็บ</span><h2>สรุปรายละเอียดแล้วเปิด LINE</h2><p>แบบฟอร์มนี้สร้างข้อความบนอุปกรณ์ของคุณ จากนั้นเปิด LINE ให้คุณตรวจและกดส่งเอง เว็บไซต์ไม่เก็บข้อมูลฟอร์ม</p><div class="notice"><strong>ลดความกังวล:</strong> ตรวจสอบรถว่างและรายละเอียดราคาก่อนชำระมัดจำ</div></div>
    <form id="quote-form" class="card quote-form">
      <div class="field"><label for="pickup-date">วันที่รับรถ</label><input id="pickup-date" name="pickup_date" type="date" required></div>
      <div class="field"><label for="pickup-time">เวลารับ</label><input id="pickup-time" name="pickup_time" type="time" required></div>
      <div class="field"><label for="pickup">จุดรับ</label><input id="pickup" name="pickup" autocomplete="street-address" required></div>
      <div class="field"><label for="dropoff">จุดส่ง</label><input id="dropoff" name="dropoff" required></div>
      <div class="field field-full"><label for="route">โปรแกรมหรือสถานที่ต้องการไป</label><textarea id="route" name="route" required></textarea></div>
      <div class="field"><label for="passengers">ผู้โดยสาร (ท่าน)</label><input id="passengers" name="passengers" type="number" min="1" max="30" required></div>
      <div class="field"><label for="luggage">กระเป๋า (ใบ)</label><input id="luggage" name="luggage" type="number" min="0" max="30" required></div>
      <div class="field"><label for="vehicle">ประเภทรถ</label><select id="vehicle" name="vehicle"><option value="">ให้ทีมงานแนะนำ</option><option>รถเก๋ง</option><option>รถไฟฟ้า</option><option>SUV</option><option>รถตู้ VIP</option><option>รถผู้บริหาร</option></select></div>
      <div class="field"><label for="days">จำนวนวัน</label><input id="days" name="days" type="number" min="1" max="30" value="1" required></div>
      <div class="field"><label for="name">ชื่อ</label><input id="name" name="name" autocomplete="name" required></div>
      <div class="field"><label for="contact">ช่องทางติดต่อ</label><input id="contact" name="contact" autocomplete="tel" required></div>
      <label class="consent field-full"><input type="checkbox" required><span>ยินยอมให้นำข้อมูลนี้ไปสร้างข้อความสำหรับส่งทาง LINE ตาม <a href="/privacy-policy/">นโยบายความเป็นส่วนตัว</a></span></label>
      <div class="field-full"><button class="btn btn-line" type="submit">สร้างข้อความและเปิด LINE</button><p class="form-status" role="status" aria-live="polite"></p></div>
    </form>
  </div>
</section>"""

def breadcrumbs_html(items: list[tuple[str, str]]) -> str:
    lis = "".join(f'<li><a href="{href}">{esc(name)}</a></li>' if i < len(items)-1 else f'<li aria-current="page">{esc(name)}</li>' for i, (name, href) in enumerate(items))
    return f'<nav class="breadcrumbs container" aria-label="เส้นทางนำทาง"><ol>{lis}</ol></nav>'

def render_landing(path: str, page: dict) -> str:
    is_tour = path.startswith("/tours/")
    crumb = [("หน้าแรก", "/")]
    if is_tour:
        crumb += [("โปรแกรมเที่ยว", "/tours/"), (page["h1"], path)]
    else:
        crumb += [(page["h1"], path)]
    faq_html = "".join(f"<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q, a in page["faqs"])
    link_html = "".join(f'<a class="link-pill" href="{href}">{esc(label)}</a>' for href, label in page["links"])
    schema = schema_base(path, page, crumb, page["faqs"])
    return f"""{head_html(path,page,schema)}
{breadcrumbs_html(crumb)}
<main id="main">
  <header class="page-hero"><div class="container"><span class="eyebrow">{esc(page['eyebrow'])}</span><h1>{esc(page['h1'])}</h1><p>{esc(page['intro'])}</p><span class="price-callout">{esc(page['price'])}</span><div class="hero-actions"><a class="btn btn-line" data-line data-placement="hero" href="{LINE_FRIEND}" target="_blank" rel="noopener noreferrer">เช็กรถว่างทาง LINE</a><a class="btn btn-secondary" href="tel:{PHONE_URI}">โทรสอบถาม</a></div></div></header>
  <section><div class="container"><div class="facts"><article class="fact"><h2>รถที่เหมาะสม</h2><p>{esc(page['suitable'])}</p></article><article class="fact"><h2>เวลาและล่วงเวลา</h2><p>{esc(page['duration'])}</p></article><article class="fact"><h2>สิ่งที่รวม</h2><p>{esc(page['include'])}</p></article><article class="fact"><h2>สิ่งที่ไม่รวม</h2><p>{esc(page['exclude'])}</p></article></div></div></section>
  <section class="section-soft"><div class="container"><div class="section-head"><div><span class="eyebrow">จองอย่างโปร่งใส</span><h2>ขั้นตอนจอง 3 ขั้น</h2></div></div><div class="grid grid-3 steps"><article class="card step"><h3>ส่งรายละเอียด</h3><p>แจ้งวัน จุดรับ–ส่ง เส้นทาง จำนวนคน กระเป๋า และประเภทรถ</p></article><article class="card step"><h3>ตรวจรถและราคา</h3><p>ทีมงานยืนยันรถว่าง พร้อมสรุปสิ่งที่รวม ไม่รวม เวลา และเงื่อนไข</p></article><article class="card step"><h3>ยืนยันก่อนชำระ</h3><p>ตรวจข้อมูลให้ครบก่อนชำระมัดจำ รายละเอียดการชำระส่งในช่องทางส่วนตัวเท่านั้น</p></article></div></div></section>
  <section><div class="container narrow"><div class="section-head"><div><span class="eyebrow">คำถามเฉพาะบริการ</span><h2>คำถามที่พบบ่อย</h2></div></div><div class="faq-list">{faq_html}</div><div class="link-list" style="margin-top:1.5rem">{link_html}</div></div></section>
  {quote_form()}
</main>
{footer_html()}<script src="/assets/js/site.js" defer></script></body></html>"""

def render_home() -> str:
    page = {"title":"รถเช่าพร้อมคนขับเชียงใหม่ ราคาชัดเจน | CARENT Chiang Mai","description":"รถเช่าพร้อมคนขับเชียงใหม่ รถเก๋ง SUV รถตู้ และรถผู้บริหาร เที่ยว รับส่งสนามบิน และภาคเหนือ เช็กรถว่างและสรุปราคาก่อนจอง","h1":"รถเช่าพร้อมคนขับเชียงใหม่ ราคาชัดเจน เดินทางสบาย","intro":""}
    faqs = [
        ("ราคาเริ่มต้นหมายถึงอะไร?", "เป็นราคาต่ำสุดของประเภทรถตามข้อมูลที่ยืนยันแล้ว ราคาจริงขึ้นกับวัน เส้นทาง ชั่วโมงบริการ และรายการที่รวม"),
        ("ขอราคาอย่างไรให้เร็ว?", "แจ้งวัน เวลา จุดรับ–ส่ง เส้นทาง จำนวนผู้โดยสาร จำนวนกระเป๋า ประเภทรถ และจำนวนวัน"),
        ("ต้องชำระเงินก่อนตรวจรถว่างหรือไม่?", "ควรตรวจสอบรถว่างและรับสรุปราคาก่อนชำระมัดจำ"),
        ("ให้บริการพื้นที่ใด?", "เชียงใหม่ เชียงราย ลำพูน ลำปาง แม่ฮ่องสอน และเส้นทางภาคเหนือที่ตกลงล่วงหน้า"),
    ]
    schema = schema_base("/", page, [("หน้าแรก","/")], faqs)
    vehicle_cards = "".join(f"""<article class="card vehicle-card"><div class="vehicle-media"><img src="{img}" width="640" height="400" loading="{'eager' if i<=3 else 'lazy'}" decoding="async" alt="{esc(alt)}"></div><div class="vehicle-card-body"><span class="vehicle-index" aria-hidden="true">{i:02d}</span><span class="badge">{esc(cap)}</span><h3>{esc(name)}</h3><p>{esc(bags)}</p><p class="price">เริ่มต้น {esc(price)}</p><div class="card-footer"><a class="text-link" data-vehicle="{esc(name)}" href="{href}">ดูรายละเอียด</a><a class="btn btn-small btn-line" data-line data-placement="vehicle" href="{LINE_FRIEND}" target="_blank" rel="noopener noreferrer">ขอราคา</a></div></div></article>""" for i,(name,cap,bags,price,href,img,alt) in enumerate(VEHICLES,1))
    tour_cards_parts = []
    for i,(name,href,price,detail) in enumerate(TOURS[:5]):
        featured = " featured" if i == 0 else ""
        loading = "eager" if i == 0 else "lazy"
        tour_cards_parts.append(f"""<article class="card tour-card{featured}"><img src="{TOUR_IMAGES[href][0]}" width="800" height="500" loading="{loading}" decoding="async" alt="{esc(TOUR_IMAGES[href][1])}"><div class="tour-card-body"><span class="badge">ทริปส่วนตัว</span><h3>{esc(name)}</h3><p>{esc(detail)}</p><p class="price">{esc(price)}</p><div class="card-footer"><a class="text-link" data-tour="{esc(name)}" href="{href}">ดูโปรแกรม</a><a class="btn btn-small" data-line data-placement="tour" href="{LINE_FRIEND}" target="_blank" rel="noopener noreferrer">เช็กรถว่าง</a></div></div></article>""")
    tour_cards = "".join(tour_cards_parts)
    faq_html = "".join(f"<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q,a in faqs)
    rows = "".join(f"<tr><td><a data-vehicle='{esc(name)}' href='{href}'>{esc(name)}</a></td><td>{esc(cap)}</td><td>{esc(bags)}</td><td>เริ่มต้น {esc(price)}</td></tr>" for name,cap,bags,price,href,*_ in VEHICLES)
    return f"""{head_html("/",page,schema)}
<main id="main">
<section class="hero" id="home">
  <div class="hero-bg" aria-hidden="true"><img src="/img/trip6.jpg" width="1600" height="1067" fetchpriority="high" decoding="async" alt=""></div>
  <div class="hero-inner">
    <div>
      <span class="eyebrow">Private journeys · Chiang Mai</span>
      <h1>รถเช่าพร้อมคนขับเชียงใหม่ ราคาชัดเจน เดินทางสบาย</h1>
      <p class="hero-lead">วางแผนทริปในจังหวะของคุณ เลือกรถเก๋ง รถไฟฟ้า SUV รถตู้ VIP หรือรถผู้บริหาร สำหรับรับส่งสนามบิน เที่ยวรายวัน ครอบครัว และลูกค้าธุรกิจ</p>
      <div class="hero-actions">
        <a class="btn btn-line" data-line data-placement="hero" href="{LINE_FRIEND}" target="_blank" rel="noopener noreferrer">เช็กรถว่างทาง LINE</a>
        <a class="btn btn-secondary" href="tel:{PHONE_URI}">โทรสอบถาม {PHONE}</a>
      </div>
      <p class="microcopy">แจ้งวัน จำนวนท่าน กระเป๋า และเส้นทาง · ทีมงานยืนยันรถว่างและราคาก่อนชำระมัดจำ</p>
    </div>
    <aside class="price-panel" aria-label="ราคาเริ่มต้น">
      <span class="eyebrow">เริ่มวางแผนการเดินทาง</span>
      <strong>รถรายวันเริ่ม <span class="price-accent">1,000 บาท</span></strong>
      <ul class="check-list">
        <li>เลือกรถตามจำนวนคนและกระเป๋า</li>
        <li>สรุปสิ่งที่รวมและไม่รวมก่อนจอง</li>
        <li>เส้นทางภาคเหนือตามที่ตกลง</li>
      </ul>
      <a href="/chiang-mai-car-rental-prices/" class="text-link">ดูราคาและเงื่อนไข</a>
    </aside>
  </div>
</section>
<div class="trust-strip"><div class="container trust-grid"><div class="trust-item">ราคาก่อนเดินทาง<span>ยืนยันตามเส้นทาง</span></div><div class="trust-item">เลือกรถตามกลุ่ม<span>แจ้งคนและกระเป๋า</span></div><div class="trust-item">รับสนามบินและโรงแรม<span>นัดหมายล่วงหน้า</span></div><div class="trust-item">พื้นที่ภาคเหนือ<span>ยืนยันเส้นทางก่อนจอง</span></div></div></div>
<section id="services"><div class="container"><div class="section-head"><div><span class="eyebrow">Choose your ride</span><h2>รถที่พอดีกับผู้โดยสาร และสัมภาระของคุณ</h2></div><p>เริ่มจากจำนวนคนและกระเป๋า แล้วให้ทีมงานตรวจรถว่าง เส้นทาง ชั่วโมงบริการ และสิ่งที่รวมก่อนจอง</p></div><div class="grid grid-3">{vehicle_cards}</div><p class="vehicle-note">ภาพเป็นตัวอย่างประเภทรถ รุ่น ปี และคันจริงยืนยันกับทีมงานก่อนจอง</p></div></section>
<section class="section-soft" id="blog"><div class="container"><div class="section-head"><div><span class="eyebrow">Journeys worth taking</span><h2>ออกไปพบเชียงใหม่ ในแบบที่คุณเลือกเอง</h2></div><a class="text-link" href="/tours/">สำรวจทุกโปรแกรม →</a></div><div class="tour-mosaic">{tour_cards}</div></div></section>
<section><div class="container"><div class="section-head"><div><span class="eyebrow">เปรียบเทียบก่อนเลือก</span><h2>จำนวนคน กระเป๋า และราคา</h2></div></div><div class="table-wrap"><table><thead><tr><th>ประเภทรถ</th><th>ผู้โดยสาร</th><th>สัมภาระ</th><th>ราคาเดิม</th></tr></thead><tbody>{rows}</tbody></table></div><p class="notice"><strong>สำคัญ:</strong> จำนวนที่นั่งสูงสุดไม่เท่ากับพื้นที่กระเป๋าสูงสุด ส่งจำนวนและขนาดกระเป๋าให้ทีมงานตรวจสอบก่อนเลือกรถ</p></div></section>
<section class="section-soft"><div class="container"><div class="section-head"><div><span class="eyebrow">จองง่ายและตรวจสอบได้</span><h2>ขั้นตอนจอง 3 ขั้น</h2></div></div><div class="grid grid-3 steps"><article class="card step"><h3>บอกรายละเอียด</h3><p>วัน เวลา จุดรับ–ส่ง เส้นทาง ผู้โดยสาร กระเป๋า และประเภทรถ</p></article><article class="card step"><h3>รับสรุปราคา</h3><p>ตรวจรถว่าง ราคา ชั่วโมงบริการ และค่าใช้จ่ายที่รวม/ไม่รวม</p></article><article class="card step"><h3>ยืนยันการจอง</h3><p>ตรวจรายละเอียดก่อนชำระมัดจำ เลขบัญชีส่งผ่านช่องทางส่วนตัวเท่านั้น</p></article></div></div></section>
<section id="portfolio"><div class="container"><div class="section-head"><div><span class="eyebrow">Atmosphere of the North</span><h2>เส้นทางที่คุ้นเคย ของทีมงานท้องถิ่น</h2></div><p>ใช้ภาพสถานที่จริงเพื่อสื่อบรรยากาศการเดินทาง ส่วนภาพรถ คนขับ และรีวิวจะเพิ่มเมื่อมีหลักฐานและสิทธิ์เผยแพร่</p></div><div class="gallery-strip"><figure class="gallery-item tall"><img src="/img/wat-phra-that-doi-suthep.webp" width="800" height="1000" loading="lazy" decoding="async" alt="พระธาตุดอยสุเทพยามเย็น"></figure><figure class="gallery-item"><img src="/img/trip5.jpg" width="800" height="500" loading="lazy" decoding="async" alt="ทุ่งดอกไม้บนภูเขาบริเวณม่อนแจ่ม"></figure><figure class="gallery-item"><img src="/img/trip7.jpg" width="800" height="500" loading="lazy" decoding="async" alt="วัดร่องขุ่น จังหวัดเชียงราย"></figure></div><p style="margin-top:1.2rem"><a class="text-link" href="/reviews/">หลักเกณฑ์การแสดงรีวิว →</a></p></div></section>
<section class="section-soft"><div class="container narrow"><div class="section-head"><div><span class="eyebrow">คำถามก่อนเดินทาง</span><h2>คำถามที่พบบ่อย</h2></div></div><div class="faq-list">{faq_html}</div><p><a class="text-link" href="/faq/">ดูคำถามทั้งหมด</a></p></div></section>
{quote_form()}
<section id="team"><div class="container grid grid-2"><div><span class="eyebrow">ติดต่อ</span><h2>สอบถามรถว่างและราคา</h2><address class="contact-box"><p><strong>โทร:</strong> <a href="tel:{PHONE_URI}">{PHONE}</a></p><p><strong>LINE:</strong> {LINE_ID}</p><p><strong>ที่อยู่:</strong> {ADDRESS}</p></address><p>เวลาทำการและเวลาตอบกลับยังรอยืนยัน จึงไม่แสดงคำอ้างเรื่องตอบทันทีหรือบริการ 24 ชั่วโมง</p></div><div class="notice"><strong>แผนที่:</strong> รอลิงก์ Google Business Profile หรือพิกัดที่เจ้าของยืนยัน เพื่อป้องกันการฝังตำแหน่งผิด</div></div></section>
</main>{footer_html()}<script src="/assets/js/site.js" defer></script></body></html>"""

def simple_page(path: str, title: str, description: str, h1: str, body: str, faqs=None) -> None:
    page = {"title":title,"description":description,"h1":h1,"intro":description}
    crumbs=[("หน้าแรก","/"),(h1,path)]
    schema=schema_base(path,page,crumbs,faqs)
    faq_block=""
    if faqs:
        faq_block='<div class="faq-list">'+''.join(f"<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q,a in faqs)+'</div>'
    output=f"""{head_html(path,page,schema)}{breadcrumbs_html(crumbs)}<main id="main"><header class="page-hero"><div class="container"><h1>{esc(h1)}</h1><p>{esc(description)}</p></div></header><section><div class="container narrow">{body}{faq_block}</div></section></main>{footer_html()}<script src="/assets/js/site.js" defer></script></body></html>"""
    write_page(path, output)

def write_page(path: str, content: str) -> None:
    target = PUBLIC / ("index.html" if path == "/" else path.strip("/") + "/index.html")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")

def build() -> None:
    (PUBLIC / "assets/css").mkdir(parents=True, exist_ok=True)
    (PUBLIC / "assets/js").mkdir(parents=True, exist_ok=True)
    (PUBLIC / "assets/css/site.css").write_text(CSS.strip()+"\n", encoding="utf-8")
    (PUBLIC / "assets/js/site.js").write_text(JS.strip()+"\n", encoding="utf-8")
    write_page("/", render_home())
    for path,page in PAGES.items():
        write_page(path,render_landing(path,page))

    price_rows="".join(f"<tr><td><a href='{href}'>{esc(name)}</a></td><td>{esc(cap)}</td><td>{esc(bags)}</td><td>เริ่มต้น {esc(price)}</td></tr>" for name,cap,bags,price,href,*_ in VEHICLES)
    simple_page("/chiang-mai-car-rental-prices/","ราคารถเช่าพร้อมคนขับเชียงใหม่ | เปรียบเทียบรถ","เปรียบเทียบราคารถพร้อมคนขับเชียงใหม่ตามข้อมูลที่ยืนยันแล้ว พร้อมข้อควรตรวจเรื่องน้ำมัน เวลา OT ค่าจอด และที่พักคนขับ","ราคารถเช่าพร้อมคนขับเชียงใหม่",f"""<div class="notice"><strong>เงื่อนไขราคา:</strong> ราคา “เริ่มต้น” ยังไม่ใช่ยอดสุดท้าย ต้องยืนยันวัน รถ เส้นทาง ชั่วโมงบริการ และรายการที่รวมก่อนจอง</div><div class="table-wrap"><table><thead><tr><th>รถ</th><th>ผู้โดยสาร</th><th>สัมภาระ</th><th>ราคา</th></tr></thead><tbody>{price_rows}</tbody></table></div><h2>รายการที่ต้องปรากฏในสรุปราคา</h2><ul><li>ค่าน้ำมันรวม/ไม่รวม</li><li>ชั่วโมงบริการและ OT</li><li>ค่าจอดรถ ค่าทางด่วน และค่าเข้าชม</li><li>ค่าที่พักคนขับสำหรับทริปค้างคืน</li><li>มัดจำ การยกเลิก และการคืนเงิน</li></ul><p><a class="btn btn-line" data-line href="{LINE_FRIEND}" target="_blank" rel="noopener noreferrer">ขอราคาตามเส้นทาง</a></p>""",[("ราคาที่แสดงเป็นราคาสุทธิหรือไม่?","ยังไม่ใช่ยอดสุดท้ายจนกว่าทีมงานจะสรุปรายการรวม/ไม่รวมตามเส้นทาง"),("ทำไมต้องแจ้งกระเป๋า?","จำนวนกระเป๋ามีผลต่อรถและจำนวนผู้โดยสารที่นั่งได้อย่างเหมาะสม"),("ทริปที่มีราคาในเว็บไซต์รวมอะไร?","ข้อมูลเดิมระบุว่ารวมค่าน้ำมันและคนขับ ให้ยืนยันอีกครั้งก่อนจอง")])

    tour_cards="".join(f"<article class='card tour-card'><img src='{TOUR_IMAGES[href][0]}' width='800' height='500' loading='lazy' decoding='async' alt='{esc(TOUR_IMAGES[href][1])}'><div class='tour-card-body'><h2><a data-tour='{esc(name)}' href='{href}'>{esc(name)}</a></h2><p>{esc(detail)}</p><p class='price'>{esc(price)}</p></div></article>" for name,href,price,detail in TOURS)
    simple_page("/tours/","โปรแกรมเหมารถเที่ยวเชียงใหม่และภาคเหนือ","เลือกโปรแกรมเหมารถเที่ยวเชียงใหม่ ดอยอินทนนท์ แม่กำปอง ม่อนแจ่ม ดอยสุเทพ เชียงราย และดอยอ่างขาง พร้อมขอราคาตามรถ","โปรแกรมเหมารถเที่ยวเชียงใหม่และภาคเหนือ",f"<p>โปรแกรมเป็นแนวทางเบื้องต้น จุดแวะจริงต้องจัดตามเวลา ฤดูกาล การเปิดสถานที่ และความเหมาะสมของเส้นทาง</p><div class='tour-mosaic'>{tour_cards}</div>")

    simple_page("/about/","เกี่ยวกับ CARENT Chiang Mai | รถพร้อมคนขับเชียงใหม่","ข้อมูลบริการ พื้นที่ให้บริการ และแนวทางราคาของ CARENT Chiang Mai โดยแสดงเฉพาะข้อมูลที่ตรวจสอบได้","เกี่ยวกับบริการรถพร้อมคนขับเชียงใหม่",f"""<p>{BRAND_NAME} ให้บริการรถพร้อมคนขับสำหรับท่องเที่ยว รับส่ง และงานธุรกิจในเชียงใหม่ เชียงราย ลำพูน ลำปาง แม่ฮ่องสอน และเส้นทางภาคเหนือที่ตกลงล่วงหน้า</p><h2>หลักการบริการที่เว็บไซต์ยืนยันได้</h2><ul><li>แสดงราคาเริ่มต้นพร้อมเงื่อนไข</li><li>ให้ลูกค้าตรวจรถว่างและสรุปราคาก่อนชำระมัดจำ</li><li>ไม่เผยเลขบัญชีธนาคารบนหน้าสาธารณะ</li><li>ไม่แสดงสถิติ รีวิว ประกัน หรือใบอนุญาตโดยไม่มีหลักฐาน</li></ul><h2>ข้อมูลนิติบุคคลและหลักฐาน</h2><p>ชื่อจดทะเบียน เลขทะเบียน ใบอนุญาต รายละเอียดประกัน และประวัติทีมงานยังรอเอกสารยืนยันก่อนเผยแพร่</p>""")
    simple_page("/reviews/","รีวิวลูกค้ารถพร้อมคนขับเชียงใหม่ | หลักฐานตรวจสอบได้","หน้ารวบรวมรีวิวจริงจากลูกค้าพร้อมวันที่ เส้นทาง และแหล่งที่มา หลังได้รับหลักฐานและสิทธิ์เผยแพร่","รีวิวจากลูกค้าที่ตรวจสอบแหล่งที่มาได้","""<div class="notice"><strong>ยังไม่เผยแพร่รีวิว:</strong> ขณะจัดทำเว็บไซต์ยังไม่มีชุดรีวิวที่ยืนยันชื่อย่อ วันที่ เส้นทาง แหล่งที่มา และสิทธิ์เผยแพร่ จึงไม่สร้างข้อความหรือคะแนนขึ้นเอง</div><h2>รูปแบบรีวิวที่จะรับเผยแพร่</h2><ul><li>ชื่อย่อหรือชื่อที่ลูกค้ายินยอม</li><li>เดือน/ปี และเส้นทางที่ใช้บริการ</li><li>ข้อความตามต้นฉบับโดยไม่เปลี่ยนความหมาย</li><li>ลิงก์ Google หรือ Facebook เมื่อมี</li></ul><p>หลังจบทริปสามารถส่งลิงก์ขอรีวิวอย่างสุภาพ โดยไม่ซื้อ แจกของ หรือแลกส่วนลดเพื่อบังคับรีวิว</p>""")
    faq_data=[("ต้องจองล่วงหน้ากี่วัน?","ยังไม่มีระยะเวลาตายตัว ควรสอบถามรถว่างทันทีเมื่อทราบวันเดินทาง"),("มัดจำเท่าไร?","ข้อมูลเดิมระบุ 500 บาทต่อทริปหรือตามตกลง ให้ยืนยันยอดและเงื่อนไขคืนเงินก่อนชำระ"),("ชำระเงินอย่างไร?","ทีมงานส่งรายละเอียดผ่านช่องทางส่วนตัวหลังยืนยันรถ เว็บไซต์ไม่แสดงเลขบัญชี"),("ราคาเหมารวมค่าน้ำมันหรือไม่?","ราคาทริปที่แสดงเดิมระบุว่ารวมน้ำมันและคนขับ ส่วนราคารายวันต้องยืนยัน"),("ใช้บริการเกินเวลาคิดอย่างไร?","ต้องระบุจำนวนชั่วโมงและ OT ในใบสรุปราคาก่อนจอง"),("เปลี่ยนเส้นทางระหว่างวันได้หรือไม่?","สอบถามคนขับและทีมงานก่อน เพราะอาจมีผลต่อเวลา ระยะทาง และราคา"),("เดินทางพร้อมเด็กได้หรือไม่?","แจ้งอายุเด็กและความต้องการคาร์ซีท ขณะนี้ยังไม่มีข้อมูลยืนยันอุปกรณ์"),("นำสัตว์เลี้ยงขึ้นรถได้หรือไม่?","ยังไม่มีนโยบายยืนยัน โปรดสอบถามก่อนจอง"),("ทริปค้างคืนมีค่าใช้จ่ายใดเพิ่ม?","ต้องยืนยันค่าที่พักคนขับและค่าใช้จ่ายต่างจังหวัดในใบสรุปราคา"),("ยกเลิกแล้วคืนมัดจำหรือไม่?","เงื่อนไขคืนเงินยังต้องยืนยันเป็นรายงานก่อนชำระมัดจำ") ]
    simple_page("/faq/","คำถามที่พบบ่อย รถเช่าพร้อมคนขับเชียงใหม่","คำตอบเรื่องราคา น้ำมัน เวลา OT มัดจำ การยกเลิก กระเป๋า เด็ก และทริปค้างคืนก่อนจองรถพร้อมคนขับเชียงใหม่","คำถามที่พบบ่อยก่อนจองรถพร้อมคนขับ","<p>คำตอบนี้แยกข้อเท็จจริงที่ยืนยันแล้วออกจากเงื่อนไขที่ต้องสอบถาม เพื่อให้ตัดสินใจได้โดยไม่เข้าใจราคาผิด</p>",faq_data)
    simple_page("/contact/","ติดต่อรถพร้อมคนขับเชียงใหม่ โทร 082-945-4005","โทรหรือ LINE เพื่อเช็กรถว่าง ขอราคา และวางเส้นทางรถพร้อมคนขับเชียงใหม่ ที่อยู่ดอนแก้ว อำเภอแม่ริม","ติดต่อและขอราคารถพร้อมคนขับเชียงใหม่",f"""<address class="contact-box card"><p><strong>โทร:</strong> <a href="tel:{PHONE_URI}">{PHONE}</a></p><p><strong>LINE:</strong> <a data-line href="{LINE_FRIEND}" target="_blank" rel="noopener noreferrer">{LINE_ID}</a></p><p><strong>ที่อยู่:</strong> {ADDRESS}</p><p><strong>Facebook:</strong> <a href="https://www.facebook.com/cnxrent" target="_blank" rel="noopener noreferrer">facebook.com/cnxrent</a></p></address><div class="notice"><strong>เวลาทำการและแผนที่:</strong> ยังรอเจ้าของยืนยันเวลาติดต่อและลิงก์ Google Business Profile จึงไม่แสดงข้อมูลที่คาดเดา</div><p><a class="btn btn-line" data-line href="{LINE_FRIEND}" target="_blank" rel="noopener noreferrer">เปิด LINE</a> <a class="btn btn-secondary" href="tel:{PHONE_URI}">โทรสอบถาม</a></p>""")
    simple_page("/booking-policy/","นโยบายการจอง มัดจำ ยกเลิก และล่วงเวลา","เงื่อนไขเบื้องต้นสำหรับจองรถพร้อมคนขับ พร้อมรายการที่ต้องยืนยันเรื่องมัดจำ ยกเลิก คืนเงิน และ OT ก่อนชำระ","นโยบายการจองและเงื่อนไขบริการ","""<div class="notice"><strong>สถานะเอกสาร:</strong> ข้อมูลเดิมยืนยันเพียงมัดจำ 500 บาทต่อทริปหรือตามตกลง เงื่อนไขยกเลิก คืนเงิน และ OT ยังต้องได้รับการอนุมัติจากเจ้าของก่อนใช้เป็นข้อตกลงฉบับสมบูรณ์</div><h2>ก่อนชำระมัดจำ</h2><ol><li>ตรวจวัน เวลา จุดรับ–ส่ง เส้นทาง และประเภทรถ</li><li>ตรวจราคาสุทธิ สิ่งที่รวม/ไม่รวม ชั่วโมงบริการ และ OT</li><li>ตรวจยอดมัดจำ วิธีชำระ กำหนดชำระ และหลักฐาน</li><li>ขอเงื่อนไขยกเลิก เปลี่ยนวัน คืนเงิน และกรณีเหตุสุดวิสัยเป็นลายลักษณ์อักษร</li></ol><h2>วันเดินทาง</h2><p>การเปลี่ยนเส้นทาง เวลารอ หรือใช้เกินเวลาควรตกลงค่าใช้จ่ายก่อนดำเนินการ หากไม่มีคนขับติดต่อก่อนวันเดินทาง โปรดโทร 082-945-4005</p>""")
    simple_page("/privacy-policy/","นโยบายความเป็นส่วนตัว | CARENT Chiang Mai","อธิบายข้อมูลที่เว็บไซต์ใช้เมื่อโทร คลิก LINE หรือสร้างข้อความขอราคา รวมการวัดผลผ่าน Google Tag Manager","นโยบายความเป็นส่วนตัว","""<p>เว็บไซต์นี้ไม่รับข้อมูลบัตร ไม่แสดงเลขบัญชี และไม่บันทึกข้อมูลจากแบบฟอร์มขอราคาบนเซิร์ฟเวอร์ แบบฟอร์มจะสร้างข้อความบนอุปกรณ์ของผู้ใช้และเปิด LINE ให้ผู้ใช้กดส่งเอง</p><h2>ข้อมูลที่อาจถูกประมวลผล</h2><ul><li>ข้อมูลที่ผู้ใช้เลือกส่งทาง LINE หรือโทรศัพท์</li><li>ข้อมูลการใช้งานทั่วไปผ่าน Google Tag Manager เช่น หน้าที่ดูและการคลิก CTA</li><li>เหตุการณ์ click_phone, click_line, quote_submit, view_vehicle และ view_tour โดยไม่ใส่ข้อความส่วนตัวใน event</li></ul><h2>วัตถุประสงค์</h2><p>ใช้ตอบคำถาม ประเมินรถ/ราคา ปรับปรุงเว็บไซต์ และวัดประสิทธิภาพช่องทางการตลาด ไม่ควรส่งข้อมูลบัตรหรือข้อมูลละเอียดอ่อนผ่านแบบฟอร์มนี้</p><h2>การติดต่อและสิทธิ์</h2><p>หากต้องการสอบถาม ขอแก้ไข หรือลบข้อมูลที่ส่งให้ธุรกิจ โปรดโทร 082-945-4005 หรือ LINE @carrent-chiangmai ระยะเวลาเก็บข้อมูลและผู้ควบคุมข้อมูลตามกฎหมายยังรอข้อมูลนิติบุคคลยืนยัน</p>""")

    paths=["/"]+list(PAGES.keys())+["/chiang-mai-car-rental-prices/","/tours/","/about/","/reviews/","/faq/","/contact/","/booking-policy/","/privacy-policy/"]
    paths=list(dict.fromkeys(paths))
    sitemap=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p in paths:
        sitemap += ["  <url>",f"    <loc>{url(p)}</loc>",f"    <lastmod>{date.today().isoformat()}</lastmod>","  </url>"]
    sitemap.append("</urlset>")
    (PUBLIC/"sitemap.xml").write_text("\n".join(sitemap)+"\n",encoding="utf-8")
    (PUBLIC/"robots.txt").write_text("User-agent: *\nAllow: /\nDisallow: /cgi-bin/\nDisallow: /stats/\nSitemap: https://carrentchiangmai.com/sitemap.xml\n",encoding="utf-8")
    (PUBLIC/".htaccess").write_text("""Options -Indexes\nRewriteEngine On\nRewriteCond %{HTTPS} !=on [OR]\nRewriteCond %{HTTP_HOST} ^www\\.carrentchiangmai\\.com$ [NC]\nRewriteRule ^ https://carrentchiangmai.com%{REQUEST_URI} [R=301,L]\nRedirect 410 /readme.txt\nRedirect 410 /index-.html\nRedirect 410 /index.html.moved\n<IfModule mod_headers.c>\nHeader always set X-Content-Type-Options "nosniff"\nHeader always set Referrer-Policy "strict-origin-when-cross-origin"\nHeader always set Permissions-Policy "camera=(), microphone=(), geolocation=()"\nHeader always set X-Frame-Options "SAMEORIGIN"\nHeader set Cache-Control "public, max-age=31536000, immutable" "expr=%{REQUEST_URI} =~ m#^/(assets|img|fonts)/#"\n</IfModule>\nErrorDocument 404 /404.html\n""",encoding="utf-8")
    not_found={"title":"ไม่พบหน้าที่ต้องการ | CARENT Chiang Mai","description":"ไม่พบหน้าที่ต้องการ กลับไปดูบริการรถพร้อมคนขับหรือโปรแกรมเที่ยว","h1":"ไม่พบหน้าที่ต้องการ","intro":""}
    not_found_head=head_html("/404.html",not_found,schema_base("/404.html",not_found,[("หน้าแรก","/"),("404","/404.html")])).replace("index,follow,max-image-preview:large","noindex,follow")
    (PUBLIC/"404.html").write_text(f"""{not_found_head}<main id="main"><section class="page-hero"><div class="container"><h1>ไม่พบหน้าที่ต้องการ</h1><p>ลิงก์อาจไม่ถูกต้องหรือหน้าถูกย้าย</p><a class="btn" href="/">กลับหน้าแรก</a></div></section></main>{footer_html()}<script src="/assets/js/site.js" defer></script></body></html>""",encoding="utf-8")

    DOCS.mkdir(parents=True,exist_ok=True)
    (DOCS/"audit.md").write_text(AUDIT,encoding="utf-8")
    (DOCS/"seo-map.md").write_text(SEO_MAP,encoding="utf-8")
    (DOCS/"content-and-local-seo.md").write_text(CONTENT_PLAN,encoding="utf-8")
    (DOCS/"measurement.md").write_text(MEASUREMENT,encoding="utf-8")
    (DOCS/"business-data-required.md").write_text(BUSINESS_DATA,encoding="utf-8")
    (DOCS/"ux/wireframes.md").write_text(WIREFRAMES,encoding="utf-8")

AUDIT = """# Audit carrentchiangmai.com\n\nอัปเดต: 26 สิงหาคม 2569\n\n## Critical\n- พบ credential แบบ plaintext ใน `public_html/readme.txt` — ลบจากชุด deploy แล้ว แต่เจ้าของต้องเปลี่ยนรหัสผ่านทันที\n- HTML เดิมปิด `body` ก่อนเนื้อหา — แทนด้วย semantic HTML ที่ถูกต้อง\n- ข้อมูลติดต่อในไฟล์สำเนาขัดแย้ง — ใช้ข้อมูลที่เจ้าของยืนยัน: 082-945-4005 และ @carrent-chiangmai\n- นำเลขบัญชีธนาคารและสถิติ 90K+/9,999/999/99 ออกจากหน้าสาธารณะ\n- ลิงก์ LINE เดิม `lin.ee/zuOYhY2` พาไป `@745njedr` ซึ่งขัดกับข้อมูลที่ยืนยัน จึงเปลี่ยนเป็นลิงก์ตรงของ `@carrent-chiangmai`\n\n## High\n- เดิมมีหน้าเดียว, H1 หลายตัว, ไม่มี schema/robots และ sitemap เก่า — สร้าง 21 URL, H1 เดียว, JSON-LD, robots และ sitemap ใหม่\n- Analytics โหลดซ้ำ GTM/GA4/legacy — เหลือ GTM `GTM-PM5GHSP` เพียงทางเดียว\n- ไฟล์ `index-.html` และ `index.html.moved` สร้าง duplicate/NAP conflict — ลบและตอบ 410\n- `/stats/` อาจเปิดเผยข้อมูล operational — robots ปิด crawl; ต้องตรวจสิทธิ์ directory ระดับ hosting เพิ่ม\n\n## Medium\n- ภาพเดิมส่วนใหญ่ไม่มี alt และบางภาพอาจเป็น stock/ไม่มีหลักฐานสิทธิ์ — ไม่ใช้เป็นคำอ้างในเว็บใหม่จนยืนยัน\n- ลิงก์ social ว่าง, Messenger ผิดรูปแบบ, modal/form ใช้งานไม่ได้ — แทนด้วย CTA จริงและ LINE quote flow\n- Bootstrap+jQuery+carousels+font icon มี payload สูง — แทนด้วย CSS/JS แบบไม่มี dependency\n\n## Low\n- ภาษาเอกสารเดิมเป็น `en`, copy ปะปน, copyright เก่า และ meta keywords — แก้เป็นไทยและตัด metadata ที่ไม่เกิดประโยชน์\n\n## URL/Equity ที่รักษา\n- `/`, `/sitemap.xml`, `/google05178207dc5b0217.html`, `/img/*` และ Facebook `cnxrent`\n- hash anchors `#home`, `#services`, `#blog`, `#portfolio`, `#team` ยังคงอยู่บนหน้าแรก\n- canonical host ใช้ non-www และ redirect HTTPS/non-www 301\n"""

SEO_MAP = """# Keyword-to-URL และ internal-link map\n\n## Primary / Commercial\n- `/` — รถเช่าพร้อมคนขับเชียงใหม่; เช่ารถเชียงใหม่พร้อมคนขับ\n- `/car-with-driver-chiang-mai/` — รถพร้อมคนขับเชียงใหม่; รถเช่าเชียงใหม่รายวันพร้อมคนขับ\n- `/chiang-mai-car-rental-prices/` — รถเช่าพร้อมคนขับเชียงใหม่ ราคา\n- `/chiang-mai-airport-transfer/` — รถรับส่งสนามบินเชียงใหม่\n- `/chiang-mai-sedan-with-driver/` — รถเก๋งพร้อมคนขับเชียงใหม่\n- `/chiang-mai-suv-with-driver/` — รถ SUV พร้อมคนขับเชียงใหม่\n- `/chiang-mai-van-with-driver/` — รถตู้เชียงใหม่พร้อมคนขับ\n- `/chiang-mai-executive-car/` — รถผู้บริหารพร้อมคนขับเชียงใหม่\n\n## Destination\n- `/tours/doi-inthanon/` — รถไปดอยอินทนนท์พร้อมคนขับ\n- `/tours/mae-kampong/` — รถไปแม่กำปอง\n- `/tours/mon-jam/` — รถไปม่อนแจ่ม\n- `/tours/doi-suthep/` — รถไปดอยสุเทพ\n- `/tours/chiang-rai-day-trip/` — รถเชียงใหม่ไปเชียงราย\n- `/tours/doi-ang-khang/` — รถไปดอยอ่างขาง\n\n## Link flow\n- หน้าแรก → ประเภทรถ, ราคา, airport, tours, policy, FAQ\n- Vehicle → ราคา + airport/ทริปที่เหมาะ + policy\n- Tour → tours hub + ราคา + policy + quote\n- ราคา → vehicle ทุกประเภท + quote\n- ทุกหน้า → contact, privacy, booking policy ผ่าน footer\n- BreadcrumbList สะท้อน hierarchy จริง; ไม่มี doorway page หรือ tag/archive URL\n"""

CONTENT_PLAN = """# Local SEO และแผนเนื้อหา 30/60/90 วัน\n\n## 0–30 วัน\n- ยืนยัน NAP, เวลาทำการ,พิกัด, ลิงก์ Google Business Profile, ชื่อธุรกิจตามกฎหมาย\n- เผยแพร่หน้าเงินหลัก รถแต่ละประเภท ราคา สนามบิน และ 5 ทริปหลัก\n- เพิ่มภาพรถ/ทีมจริงที่มีสิทธิ์ใช้ พร้อมรุ่น ปี ที่นั่ง และกระเป๋า\n- ตั้ง GBP หมวดหมู่หลักตามบริการจริง เพิ่มพื้นที่บริการ ชั่วโมง รูป และลิงก์หน้าเหมาะสม\n\n## 31–60 วัน\n- เก็บคำถามจริงจาก LINE/โทร แล้วขยาย FAQ เรื่อง OT, น้ำมัน, เด็ก, ค้างคืน และยกเลิก\n- คู่มือเลือกรถตามคน/กระเป๋า และเส้นทางตามฤดูกาล โดยผู้ให้บริการตรวจทาน\n- ขอ citation จากโรงแรม บริษัททัวร์ หอการค้า/ไดเรกทอรีท้องถิ่นที่น่าเชื่อถือ โดยใช้ NAP เดียวกัน\n\n## 61–90 วัน\n- Case study จากงานจริงหลังได้รับความยินยอม ระบุโจทย์ เส้นทาง รถ และข้อจำกัด ไม่เปิดข้อมูลส่วนตัว\n- เพิ่มเส้นทางจากคำถามลูกค้าจริง ไม่ผลิตหน้าเปลี่ยนเพียงชื่อสถานที่\n- ส่งลิงก์ขอ Google review หลังจบทริปโดยไม่ซื้อหรือแลกรีวิว และตอบทุกรีวิวด้วยภาษาธรรมชาติ\n\nทุกบทความต้องมีผู้ตรวจทาน วันที่อัปเดต ภาพจริง แหล่งข้อมูล และลิงก์กลับหน้าบริการที่เกี่ยวข้อง\n"""

MEASUREMENT = """# Measurement และ KPI dashboard specification\n\n## Events\n- `click_phone`: คลิกลิงก์ `tel:`\n- `click_line`: คลิก LINE พร้อม `placement` และ `page_path`\n- `quote_submit`: ผ่าน validation และสร้างข้อความ LINE แล้ว\n- `view_vehicle`: คลิกรายละเอียดรถ พร้อม `vehicle_name`\n- `view_tour`: คลิกรายละเอียดทริป พร้อม `tour_name`\n- `booking_complete`: ห้ามยิงจากเว็บไซต์อัตโนมัติ ต้อง import/ส่งจากระบบหลังเจ้าของยืนยันการจองจริง\n\nEvents ส่งเข้า `dataLayer`; ต้องตั้ง GA4 Event tags ใน GTM `GTM-PM5GHSP` และตรวจด้วย Preview/DebugView โดยไม่เก็บชื่อ เบอร์ หรือข้อความเส้นทางใน event parameters\n\n## Dashboard\n- Search Console: impressions, non-brand clicks, query/page, Top 10 keywords\n- Google Business Profile: calls, website clicks, directions และข้อความตามข้อมูลที่ API/GBP ให้ได้\n- GA4: LINE clicks, phone clicks, quote submissions, vehicle/tour views\n- Booking source: confirmed bookings และมูลค่าจากระบบหลังบ้าน/ชีตที่จำกัดสิทธิ์\n- Funnel: organic landing → CTA click → quote_submit → booking_complete\n\n## เกณฑ์รายงาน\n- รายสัปดาห์: tracking errors, leads, landing pages\n- รายเดือน: non-brand trend, Top 10 coverage, GBP actions, conversion rate, confirmed bookings\n- ห้ามตีความอันดับจาก location เดียว; ใช้ Search Console และเครื่องมือ rank tracking ที่ตั้งพื้นที่เชียงใหม่\n"""

BUSINESS_DATA = """# ข้อมูลจริงที่เจ้าของยังต้องยืนยัน\n\n1. อีเมลธุรกิจที่ถูกต้อง (ไฟล์เดิมสะกด `carrentchingmai` และเคยมี credential รั่ว)\n2. ชื่อผู้ประกอบการ/นิติบุคคล เลขทะเบียน ภาษี และใบอนุญาตที่เผยแพร่ได้\n3. เวลาทำการและเวลาตอบกลับจริง\n4. ลิงก์ Google Business Profile และพิกัดแผนที่ของที่อยู่ 208/36 ดอนแก้ว\n5. รุ่น ปี ทะเบียน/การปิดบังทะเบียน จำนวนรถ จำนวนที่นั่ง และกระเป๋าของรถแต่ละคัน\n6. ประกันรถและผู้โดยสาร ขอบเขตความคุ้มครอง และวันหมดอายุ\n7. ประวัติ/คุณสมบัติคนขับ ภาษา และหลักฐานความชำนาญเส้นทาง\n8. ราคารายวันรวมค่าน้ำมันหรือไม่, OT, ค่าจอด, ทางด่วน, ที่พักคนขับ และค่าขึ้นเขา\n9. ราคาสนามบิน จุดนัดพบ เวลารอ และกรณีเที่ยวบินล่าช้า\n10. มัดจำ ยกเลิก เปลี่ยนวัน คืนเงิน no-show และเหตุสุดวิสัย\n11. คาร์ซีท สัตว์เลี้ยง การเข้าถึงสำหรับผู้ใช้รถเข็น และสัมภาระพิเศษ\n12. รีวิวพร้อมชื่อย่อ วันที่ เส้นทาง แหล่งที่มา และความยินยอม\n13. ภาพรถ ทีม คนขับ และงานจริง พร้อมสิทธิ์เผยแพร่/alt ที่ถูกต้อง\n14. ผู้ควบคุมข้อมูล ระยะเวลาเก็บข้อมูล และช่องทางใช้สิทธิ์ PDPA\n15. ขั้นตอนยืนยัน booking_complete และแหล่งข้อมูลยอดจองจริง\n"""

WIREFRAMES = """# Wireframe และ design system ย่อ\n\n## Homepage\n1. Sticky header: brand / บริการ / ราคา / ทริป / FAQ / contact / LINE\n2. Hero: H1 + service summary + LINE/โทร + price clarity panel\n3. Trust strip: ราคา / เลือกรถ / airport / service area\n4. Vehicle cards → comparison table\n5. Tour cards\n6. Booking steps\n7. Evidence-only trust placeholder\n8. FAQ\n9. LINE quote form\n10. NAP + map placeholder\n11. Footer + mobile sticky CTA\n\n## Landing template\nBreadcrumb → H1/intent/price/CTA → suitability/duration/include/exclude → 3-step booking → page-specific FAQ → contextual internal links → quote form → footer\n\n## Tokens\n- Forest `#123c31`, dark forest `#0d2d25`, warm gold `#d99b3f`, CTA orange `#e96f32`, cream `#fbf7ee`\n- Noto Sans Thai fallback to Tahoma; no blocking remote font\n- 18px cards, visible 3px focus, min 46px controls, contrast AA\n- Breakpoints: 620px and 900px; layout tested from 360px\n- No autoplay, slider, video, parallax, decorative animation, or misleading stock imagery\n"""

WIREFRAMES = WIREFRAMES.replace(
    "Forest `#123c31`, dark forest `#0d2d25`, warm gold `#d99b3f`, CTA orange `#e96f32`, cream `#fbf7ee`",
    "Navy `#17365d`, deep navy `#0b1f3a`, warm gold `#d4a64a`, CTA amber `#b97816`, cream `#f8f5ec`",
)
WIREFRAMES = WIREFRAMES.replace(
    "Noto Sans Thai fallback to Tahoma; no blocking remote font",
    "Kanit 400/500/600/700 self-hosted with font-display swap; fallback to Tahoma",
)

if __name__ == "__main__":
    build()
    print("Generated static site and documentation.")
