export interface RouteSEOData {
  path: string;
  enPath: string;
  title_th: string;
  title_en: string;
  description_th: string;
  description_en: string;
  keywords_th: string;
  keywords_en: string;
  h1_th: string;
  h1_en: string;
  hero_image: string;
  price_start: number;
  duration_th: string;
  duration_en: string;
  capacity_passengers: string;
  capacity_luggage: string;
  pickup_locations_th: string[];
  pickup_locations_en: string[];
  service_area_th: string;
  service_area_en: string;
  intro_th: string;
  intro_en: string;
  details_th: {
    pricing_notes: string;
    suitable_vehicles: { type: string; name: string; price: number; capacity: string }[];
    itinerary_example?: { time: string; spot: string; desc: string }[];
    stops_along_way?: string[];
    includes: string[];
    excludes: string[];
    booking_steps: string[];
  };
  details_en: {
    pricing_notes: string;
    suitable_vehicles: { type: string; name: string; price: number; capacity: string }[];
    itinerary_example?: { time: string; spot: string; desc: string }[];
    stops_along_way?: string[];
    includes: string[];
    excludes: string[];
    booking_steps: string[];
  };
  faqs: { q_th: string; q_en: string; a_th: string; a_en: string }[];
  related_routes: { name_th: string; name_en: string; path: string }[];
}

export const ROUTE_SEO_DATABASE: Record<string, RouteSEOData> = {
  '/car-with-driver-chiang-mai/': {
    path: '/car-with-driver-chiang-mai/',
    enPath: '/en/car-with-driver-chiang-mai/',
    title_th: 'รถเช่าพร้อมคนขับเชียงใหม่ บริการรถเก๋ง SUV รถตู้ VIP | MR Car Rent',
    title_en: 'Private Driver Chiang Mai Service | Sedan, SUV & VIP Van Rental',
    description_th: 'บริการรถเช่าพร้อมคนขับเชียงใหม่ รถใหม่สะอาด คนขับชำนาญทาง สุภาพ ตรงเวลา ครอบคลุมทุกเส้นทางเชียงใหม่และภาคเหนือ เช็กราคาและจองผ่าน LINE',
    description_en: 'Rent a car with private driver in Chiang Mai. English-speaking option, clean modern vehicles, fuel included packages available.',
    keywords_th: 'รถเช่าพร้อมคนขับเชียงใหม่, รถพร้อมคนขับเชียงใหม่, เหมารถเชียงใหม่, รถเช่าเชียงใหม่พร้อมคนขับ',
    keywords_en: 'Chiang Mai car with driver, Private driver Chiang Mai, Chiang Mai private driver',
    h1_th: 'บริการรถเช่าพร้อมคนขับเชียงใหม่ VIP สะอาด ปลอดภัย ราคาชัดเจน',
    h1_en: 'Chiang Mai Private Car with Driver Service',
    hero_image: '/images/hero_chiangmai_car.jpg?v=fixed_20260808',
    price_start: 1200,
    duration_th: 'รายวัน (8-10 ชม./วัน) หรือเหมาเที่ยว',
    duration_en: 'Daily (8-10 hrs/day) or Custom Trip',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '2-8 ใบ',
    pickup_locations_th: ['สนามบินเชียงใหม่ (CNX)', 'โรงแรมและที่พักในตัวเมืองเชียงใหม่', 'สถานีรถไฟเชียงใหม่', 'สถานีขนส่งอาเขต'],
    pickup_locations_en: ['Chiang Mai Airport (CNX)', 'Downtown Hotels & Resorts', 'Chiang Mai Train Station', 'Arcade Bus Terminal'],
    service_area_th: 'ตัวเมืองเชียงใหม่, อำเภอรอบนอก (แม่ริม, หางดง, จอมทอง) และต่างจังหวัดภาคเหนือ',
    service_area_en: 'Chiang Mai City, Suburbs (Mae Rim, Hang Dong, Chom Thong) & Northern Provinces',
    intro_th: 'MR Car Rent Chiang Mai ให้บริการรถเช่าพร้อมคนขับยกระดับการเดินทางท่องเที่ยว การประชุมสัมมนา หรือธุรกิจในเชียงใหม่ ให้คุณพักผ่อนสบายตลอดการเดินทาง ไม่ต้องเหนื่อยขับเอง ไม่ต้องกังวลเรื่องหลงทาง หรือหาที่จอดรถ ด้วยคนขับมืออาชีพท้องถิ่นที่ชำนาญเส้นทางสายดอยและทางโค้งเป็นอย่างดี',
    intro_en: 'MR Car Rent Chiang Mai offers premium private car with driver services to make your holiday or business trip in Northern Thailand completely stress-free. Avoid mountain driving worries and navigation hassles with our experienced local drivers.',
    details_th: {
      pricing_notes: 'ราคาเริ่มต้นเพียง 1,200 บาท/วัน (รถเก๋ง) ไม่รวมค่าน้ำมัน หรือเลือกแบบรวมน้ำมันเหมาจ่ายตามโปรแกรม',
      suitable_vehicles: [
        { type: 'รถเก๋ง', name: 'Toyota Yaris Ativ / Altis', price: 1200, capacity: '1-4 ท่าน' },
        { type: 'รถ SUV', name: 'Toyota Fortuner Leader', price: 1800, capacity: '1-6 ท่าน' },
        { type: 'รถตู้ VIP', name: 'Toyota Commuter VIP 10 ที่นั่ง', price: 2200, capacity: '1-10 ท่าน' }
      ],
      includes: [
        'รถยนต์พร้อมพนักงานขับรถชำนาญทาง',
        'พนักงานขับรถสุภาพ ตรงเวลา ไม่สูบบุหรี่ในรถ',
        'ประกันภัยอุบัติเหตุผู้โดยสารตามกฎหมาย',
        'น้ำดื่มบรรจุขวดฟรีในรถ'
      ],
      excludes: [
        'ค่าน้ำมันเชื้อเพลิง (ตามที่ใช้จริง หรือตามตกลง)',
        'ค่าธรรมเนียมจอดรถและค่าทางด่วน (ถ้ามี)',
        'ค่าเข้าชมสถานที่ท่องเที่ยว'
      ],
      booking_steps: [
        '1. แจ้งวันที่เดินทาง จำนวนผู้โดยสาร และสถานที่ที่ต้องการไป',
        '2. เลือกรถที่เหมาะสม (เก๋ง, SUV หรือ รถตู้ VIP)',
        '3. รับใบเสนอราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง',
        '4. ยืนยันการจองผ่าน LINE และรับข้อมูลคนขับก่อนวันเดินทาง'
      ]
    },
    details_en: {
      pricing_notes: 'Rates starting from 1,200 THB/day for Sedan (fuel pay as used or all-inclusive quote available)',
      suitable_vehicles: [
        { type: 'Sedan', name: 'Toyota Yaris Ativ / Altis', price: 1200, capacity: '1-4 Pax' },
        { type: 'SUV', name: 'Toyota Fortuner Leader', price: 1800, capacity: '1-6 Pax' },
        { type: 'VIP Van', name: 'Toyota Commuter VIP 10-Seater', price: 2200, capacity: '1-10 Pax' }
      ],
      includes: [
        'Clean vehicle with experienced local private driver',
        'Polite, punctual, non-smoking driver',
        'Passenger accident insurance',
        'Complimentary bottled water'
      ],
      excludes: [
        'Fuel (pay-as-used or included in custom quote)',
        'Parking & toll fees (if any)',
        'Entrance fees to attractions'
      ],
      booking_steps: [
        '1. Share your travel dates, passenger count & itinerary',
        '2. Select your preferred vehicle (Sedan, SUV or VIP Van)',
        '3. Receive an instant transparent quote with no hidden fees',
        '4. Confirm booking via LINE or WhatsApp'
      ]
    },
    faqs: [
      {
        q_th: 'คิดค่าน้ำมันอย่างไร?',
        q_en: 'How is fuel calculated?',
        a_th: 'มี 2 แบบค่ะ: 1. เติมน้ำมันเต็มถังวันแรก และลูกค้าเติมคืนเต็มถังวันสุดท้าย 2. เหมาจ่ายรวมน้ำมันตามระยะทางและโปรแกรมทริปที่ตกลงกันไว้',
        a_en: 'We offer 2 options: 1. Full-to-full tank policy (pay as used). 2. Fixed all-inclusive trip package quote.'
      },
      {
        q_th: 'คนขับสามารถสื่อสารภาษาอังกฤษได้ไหม?',
        q_en: 'Can drivers speak English?',
        a_th: 'เรามีทีมคนขับที่สามารถสื่อสารภาษาอังกฤษพื้นฐานสำหรับการต้อนรับและประสานงานสถานที่ท่องเที่ยวได้ค่ะ สามารถระบุขอคนขับพูดภาษาอังกฤษล่วงหน้าได้ฟรี',
        a_en: 'Yes, we have basic English-speaking drivers available upon advance request at no extra charge.'
      }
    ],
    related_routes: [
      { name_th: 'รถตู้พร้อมคนขับเชียงใหม่', name_en: 'VIP Van Rental', path: '/chiang-mai-van-rental/' },
      { name_th: 'รถรับส่งสนามบินเชียงใหม่', name_en: 'Airport Transfer', path: '/chiang-mai-airport-transfer/' },
      { name_th: 'เหมารถไปแม่กำปอง', name_en: 'Mae Kampong Tour', path: '/mae-kampong-car-rental/' }
    ]
  },

  '/chiang-mai-van-rental/': {
    path: '/chiang-mai-van-rental/',
    enPath: '/en/chiang-mai-van-with-driver/',
    title_th: 'รถตู้พร้อมคนขับเชียงใหม่ VIP 10 ที่นั่ง เบาะนวดทีวี USB | MR Car Rent',
    title_en: 'VIP 10-Seater Van Rental with Driver Chiang Mai | MR Car Rent',
    description_th: 'เช่ารถตู้พร้อมคนขับเชียงใหม่ Toyota Commuter VIP 10 ที่นั่ง เบาะนวดปรับนอน แอร์เย็นฉ่ำ ทีวีเครื่องเสียงครบ เหมาะสำหรับครอบครัวและกรุ๊ปสัมมนา',
    description_en: 'Luxury 10-seater Toyota Commuter VIP Van rental with polite local driver for family & group tours in Chiang Mai & Northern Thailand.',
    keywords_th: 'รถตู้พร้อมคนขับเชียงใหม่, รถตู้เชียงใหม่, เช่ารถตู้เชียงใหม่, รถตู้ VIP เชียงใหม่',
    keywords_en: 'Chiang Mai van with driver, VIP van rental Chiang Mai, 10 seater van Chiang Mai',
    h1_th: 'รถตู้พร้อมคนขับเชียงใหม่ VIP 10 ที่นั่ง ตกแต่งหรูหรา นั่งสบาย',
    h1_en: 'VIP 10-Seater Van Rental with Driver in Chiang Mai',
    hero_image: '/images/vip_van_2026.jpg?v=fixed_20260808',
    price_start: 2200,
    duration_th: '10 ชั่วโมง/วัน (08:00 - 18:00 น.)',
    duration_en: '10 Hours/Day (e.g. 08:00 - 18:00)',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '6-8 ใบ',
    pickup_locations_th: ['สนามบินเชียงใหม่', 'โรงแรมทุกแห่งในเชียงใหม่', 'จุดนัดพบที่ต้องการ'],
    pickup_locations_en: ['Chiang Mai Airport (CNX)', 'All Chiang Mai Hotels', 'Custom Location'],
    service_area_th: 'เชียงใหม่, เชียงราย, แม่ฮ่องสอน, ปาย, ลำปาง, ลำพูน',
    service_area_en: 'Chiang Mai, Chiang Rai, Mae Hong Son, Pai, Lampang, Lamphun',
    intro_th: 'บริการรถตู้ Toyota Commuter VIP 10 ที่นั่ง รุ่นใหม่ทรงสูง ตกแต่งภายในดีไซน์VIP พร้อมเบาะนวดกว้างพิเศษ ปรับนอนได้สบาย ไม่อึดอัด ติดตั้ง Android Smart TV เครื่องเสียงรอบคัน และช่องชาร์จ USB/Type-C ทุกที่นั่ง พร้อมพนักงานขับรถชำนาญทางสายดอยสูง',
    intro_en: 'Experience premium group travel with our flagship Toyota Commuter VIP 10-Seater Van. Featuring plush reclining captain seats, Android Smart TV, high-performance climate control, and USB chargers at every row.',
    details_th: {
      pricing_notes: 'ราคา 2,200 บาท/วัน (บริการ 10 ชม.) ไม่รวมค่าน้ำมันและค่าจอดรถ',
      suitable_vehicles: [
        { type: 'รถตู้ VIP 10 ที่นั่ง', name: 'Toyota Commuter VIP (New Model)', price: 2200, capacity: '10 ท่าน + กระเป๋า 6-8 ใบ' },
        { type: 'รถตู้ Majestic VIP', name: 'Toyota Commuter VIP Luxury Roof', price: 2500, capacity: '10 ท่าน + ไฟ Ambient Light' },
        { type: 'รถตู้ Alphard VIP', name: 'Toyota Alphard Executive Lounge', price: 4500, capacity: '1-5 ท่าน' }
      ],
      includes: [
        'รถตู้ VIP พร้อมพนักงานขับรถมืออาชีพ',
        'ระบบแอร์เย็นฉ่ำ ทีวี Android และชาร์จ USB ทุกที่นั่ง',
        'ประกันภัยอุบัติเหตุผู้โดยสารสูงสุดตามกฎหมาย',
        'น้ำดื่มเย็นบริสุทธิ์ฟรีตลอดทริป'
      ],
      excludes: [
        'ค่าน้ำมันเชื้อเพลิงตามจริง',
        'ค่าธรรมเนียมที่จอดรถและทางด่วน',
        'ค่าล่วงเวลาหลัง 10 ชั่วโมง (200 บาท/ชม.)'
      ],
      booking_steps: [
        '1. ทักไลน์ @mrcarrentcm เพื่อเช็กคิวรถตู้',
        '2. แจ้งจำนวนวันเดินทางและโปรแกรมเที่ยว',
        '3. มัดจำเพื่อจองรถ ล็อคคิวทันที',
        '4. รับเบอร์และชื่อคนขับล่วงหน้า 1 วัน'
      ]
    },
    details_en: {
      pricing_notes: '2,200 THB/day (10 hours service). Fuel & parking excluded.',
      suitable_vehicles: [
        { type: 'VIP Van 10 Seats', name: 'Toyota Commuter VIP (New Model)', price: 2200, capacity: '10 Pax + 6-8 Bags' },
        { type: 'Majestic VIP Van', name: 'Toyota Commuter Luxury Ambient', price: 2500, capacity: '10 Pax + Ambient Light' },
        { type: 'Alphard VIP', name: 'Toyota Alphard Executive Lounge', price: 4500, capacity: '1-5 Pax' }
      ],
      includes: [
        'VIP Van with dedicated professional local driver',
        'Android TV, Sound system & USB chargers for all rows',
        'Full passenger liability insurance',
        'Free bottled water'
      ],
      excludes: [
        'Fuel (pay as used)',
        'Parking & toll fees',
        'Overtime fee (200 THB/hour after 10 hours)'
      ],
      booking_steps: [
        '1. Contact us on LINE or WhatsApp to check van availability',
        '2. Provide travel dates & destination plan',
        '3. Secure booking with a small deposit',
        '4. Driver contact details sent 1 day prior to pickup'
      ]
    },
    faqs: [
      {
        q_th: 'รถตู้สามารถนั่งได้สูงสุดกี่คน?',
        q_en: 'What is the maximum capacity of the VIP Van?',
        a_th: 'รถตู้ VIP ของเราเบาะใหญ่สบาย 10 ที่นั่งสำหรับผู้โดยสารค่ะ หากมีสัมภาระกระเป๋าเดินทางเยอะ แนะนำนั่งไม่เกิน 8-9 ท่านเพื่อให้มีพื้นที่วางกระเป๋า',
        a_en: 'Our VIP Commuter comfortably accommodates up to 10 passengers. For groups with excessive luggage, 8-9 passengers is recommended.'
      }
    ],
    related_routes: [
      { name_th: 'รถไปแม่กำปอง', name_en: 'Mae Kampong Van', path: '/mae-kampong-car-rental/' },
      { name_th: 'รถไปดอยอินทนนท์', name_en: 'Doi Inthanon Van', path: '/doi-inthanon-car-rental/' },
      { name_th: 'รถเชียงใหม่ไปปาย', name_en: 'Pai Van Transfer', path: '/chiang-mai-to-pai/' }
    ]
  },

  '/chiang-mai-airport-transfer/': {
    path: '/chiang-mai-airport-transfer/',
    enPath: '/en/chiang-mai-airport-transfer/',
    title_th: 'รถรับส่งสนามบินเชียงใหม่ (CNX) คนขับรอรับ เริ่ม 350 บ. | MR Car Rent',
    title_en: 'Private Chiang Mai Airport Transfer (CNX) | Driver Pickup',
    description_th: 'บริการรถรับส่งสนามบินเชียงใหม่ (CNX) สะดวกรวดเร็ว คนขับรอรับตรงประตูขาเข้า ส่งตรงถึงโรงแรมและที่พัก ไม่ต้องรอคิวแท็กซี่',
    description_en: 'Hassle-free private transfer from Chiang Mai International Airport (CNX) to hotel/resort. Reliable drivers, clear pricing.',
    keywords_th: 'รถรับส่งสนามบินเชียงใหม่, รถไปสนามบินเชียงใหม่, รับส่งสนามบินเชียงใหม่, แท็กซี่สนามบินเชียงใหม่',
    keywords_en: 'Chiang Mai airport transfer, Chiang Mai airport taxi, CNX airport pickup',
    h1_th: 'บริการรถรับส่งสนามบินเชียงใหม่ (CNX) ส่งตรงถึงโรงแรม สะดวก ไม่ต้องรอนาน',
    h1_en: 'Private Chiang Mai Airport Transfer Service (CNX)',
    hero_image: '/images/sedan_vios_chiangmai.jpg?v=fixed_20260808',
    price_start: 350,
    duration_th: 'ประมาณ 20-40 นาที (ตามระยะทางที่พัก)',
    duration_en: 'Approx. 20-40 mins to city hotels',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '2-8 ใบ',
    pickup_locations_th: ['อาคารผู้โดยสารขาเข้า สนามบินเชียงใหม่ (CNX)', 'โรงแรม คอนโด และที่พักทุกแห่งในเชียงใหม่'],
    pickup_locations_en: ['Arrival Hall, Chiang Mai Airport (CNX)', 'All Hotels & Resorts in Chiang Mai'],
    service_area_th: 'ตัวเมืองเชียงใหม่, นิมมาน, คูเมือง, แม่ริม, หางดง, สันกำแพง, แม่แตง',
    service_area_en: 'Chiang Mai Old City, Nimman, Mae Rim, Hang Dong, San Kamphaeng, Mae Taeng',
    intro_th: 'เดินทางถึงสนามบินเชียงใหม่ (CNX) อย่างราบรื่นด้วยบริการรถรับส่งส่วนตัว พนักงานขับรถของเราจะมารอรับคุณตรงประตูทางออกผู้โดยสารขาเข้า ช่วยยกสัมภาระขึ้นรถแอร์เย็นฉ่ำ ส่งตรงถึงหน้าเคาน์เตอร์โรงแรมอย่างปลอดภัย ตรงเวลา',
    intro_en: 'Arrive in Chiang Mai with total peace of mind. Our friendly driver will wait for you at the airport arrival exit, assist with your luggage, and drive you straight to your hotel in a cool, clean private vehicle.',
    details_th: {
      pricing_notes: 'ราคาเริ่มต้น 350 - 500 บาท/เที่ยว สำหรับโซนตัวเมืองเชียงใหม่ นิมมาน คูเมือง (รวมค่าน้ำมันและค่าจอดรถสนามบินแล้ว)',
      suitable_vehicles: [
        { type: 'รถเก๋ง', name: 'Toyota Yaris Ativ / Altis', price: 350, capacity: '1-3 ท่าน + กระเป๋า 2 ใบ' },
        { type: 'รถ SUV', name: 'Toyota Fortuner Leader', price: 600, capacity: '1-5 ท่าน + กระเป๋า 4 ใบ' },
        { type: 'รถตู้ VIP', name: 'Toyota Commuter VIP 10 ที่นั่ง', price: 800, capacity: '1-10 ท่าน + กระเป๋า 8 ใบ' }
      ],
      includes: [
        'รถรับส่งส่วนตัว ไม่ต้องวนรับผู้โดยสารอื่น',
        'คนขับรอรับที่ประตูขาเข้า',
        'รวมค่าน้ำมันเชื้อเพลิงและค่าจอดรถสนามบินเรียบร้อย',
        'เช็กไฟลท์บินให้ฟรี หากเที่ยวบินดีเลย์รอรับได้ไม่คิดเพิ่ม'
      ],
      excludes: [
        'ค่าธรรมเนียมแวะสถานที่เติมนอกเหนือจากเส้นทางที่แจ้ง'
      ],
      booking_steps: [
        '1. ส่งรายละเอียดเที่ยวบิน (Flight No.) และเวลาลงเครื่อง',
        '2. ระบุชื่อโรงแรมที่ต้องการให้ไปส่ง',
        '3. รับบุ๊กกิ้งและเบอร์ติดต่อคนขับ',
        '4. คนขับรอรับ ณ สนามบินเชียงใหม่'
      ]
    },
    details_en: {
      pricing_notes: 'From 350 THB for city center/Nimman/Old Town hotels (All-inclusive: fuel & airport parking included).',
      suitable_vehicles: [
        { type: 'Sedan', name: 'Toyota Yaris Ativ / Altis', price: 350, capacity: '1-3 Pax + 2 Bags' },
        { type: 'SUV', name: 'Toyota Fortuner Leader', price: 600, capacity: '1-5 Pax + 4 Bags' },
        { type: 'VIP Van', name: 'Toyota Commuter VIP', price: 800, capacity: '1-10 Pax + 8 Bags' }
      ],
      includes: [
        'Direct 100% private transfer to your hotel',
        'Driver waiting at arrival gate',
        'Includes fuel and airport parking fees',
        'Flight monitoring (free waiting if flight is delayed)'
      ],
      excludes: [
        'Additional stops outside the route'
      ],
      booking_steps: [
        '1. Send your flight number & arrival time',
        '2. Provide hotel name/address',
        '3. Receive booking confirmation & driver details',
        '4. Driver greets you at CNX airport gate'
      ]
    },
    faqs: [
      {
        q_th: 'หากเที่ยวบินดีเลย์ ล่าช้า จะถูกคิดเงินเพิ่มไหม?',
        q_en: 'What if my flight is delayed?',
        a_th: 'ไม่ต้องกังวลค่ะ ทางเราติดตามสถานะเที่ยวบินผ่านระบบแบบ Real-time คนขับจะปรับเวลามารอรับเมื่อเครื่องลงจริงโดยไม่มีค่าบริการเพิ่ม',
        a_en: 'No extra charge! We track flight arrivals in real-time and adjust pickup times automatically if delayed.'
      }
    ],
    related_routes: [
      { name_th: 'รถเช่าพร้อมคนขับเชียงใหม่', name_en: 'Private Driver Chiang Mai', path: '/car-with-driver-chiang-mai/' },
      { name_th: 'เหมารถเที่ยวเชียงใหม่ 1 วัน', name_en: 'Chiang Mai Day Trip', path: '/chiang-mai-day-trip/' }
    ]
  },

  '/mae-kampong-car-rental/': {
    path: '/mae-kampong-car-rental/',
    enPath: '/en/mae-kampong-car-rental/',
    title_th: 'รถไปแม่กำปองจากเชียงใหม่ พร้อมคนขับชำนาญทาง เริ่ม 1,800 บ. | MR Car Rent',
    title_en: 'Chiang Mai to Mae Kampong Private Driver & Car Rental | MR Car Rent',
    description_th: 'บริการเหมารถไปแม่กำปองจากเชียงใหม่ พร้อมคนขับสุภาพ ชำนาญทางโค้งชัน แวะคาเฟ่ ชุมชนแม่กำปอง น้ำตกแม่กำปอง เช็กคิวและขอราคาได้ทันที',
    description_en: 'Private car & van rental with driver from Chiang Mai to Mae Kampong village. Mountain road expert driver, stop at top cafes & waterfalls.',
    keywords_th: 'รถไปแม่กำปอง, เหมารถไปแม่กำปอง, รถพร้อมคนขับแม่กำปอง, รถไปแม่กำปองราคาเท่าไหร่',
    keywords_en: 'Mae Kampong car rental, Chiang Mai to Mae Kampong private car, Mae Kampong driver',
    h1_th: 'รถไปแม่กำปองจากเชียงใหม่ พร้อมคนขับชำนาญทาง นั่งสบาย ปลอดภัย',
    h1_en: 'Private Car & Van with Driver from Chiang Mai to Mae Kampong',
    hero_image: '/images/mae_kampong.jpg?v=fixed_20260808',
    price_start: 1800,
    duration_th: '8-9 ชั่วโมง (1 Day Trip)',
    duration_en: '8-9 Hours (Full Day Trip)',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '2-8 ใบ',
    pickup_locations_th: ['โรงแรมในตัวเมืองเชียงใหม่', 'สนามบินเชียงใหม่ (CNX)'],
    pickup_locations_en: ['Chiang Mai City Hotels', 'Chiang Mai Airport (CNX)'],
    service_area_th: 'เชียงใหม่ - อ.แม่ออน - ชุมชนบ้านแม่กำปอง - คาเฟ่ระเบียงวิว - น้ำตกแม่กำปอง - โครงการหลวงตระกูลสิงห์',
    service_area_en: 'Chiang Mai - Mae On - Mae Kampong Village - Teddu Cafe - Waterfall',
    intro_th: 'เดินทางสู่แม่กำปอง หมู่บ้านโฮมสเตย์กลางทิวเขาแม่ออนอันเงียบสงบ ด้วยรถเช่าพร้อมคนขับชำนาญทางชันและโค้งดอยเป็นอย่างดี ให้คุณดื่มด่ำกับธรรมชาติ อากาศเย็นสบาย แวะถ่ายรูปคาเฟ่ชิคๆ และชิมไส้อั่วแม่กำปองได้อย่างสบายใจ ไม่ต้องกังวลเรื่องการขับรถบนทางชัน',
    intro_en: 'Discover the charm of Mae Kampong, a picturesque mountain village nestled in tropical rainforests. Enjoy a comfortable ride with an experienced driver who navigates steep mountain curves effortlessly while you snap photos at iconic streamside cafes.',
    details_th: {
      pricing_notes: 'รถเก๋งเริ่มต้น 1,800 บาท | รถ SUV เริ่มต้น 2,200 บาท | รถตู้ VIP เริ่มต้น 2,500 บาท (รวมน้ำมันเชื้อเพลิงแล้ว)',
      suitable_vehicles: [
        { type: 'รถเก๋ง', name: 'Toyota Yaris Ativ / Altis', price: 1800, capacity: '1-3 ท่าน (รวมน้ำมัน)' },
        { type: 'รถ SUV', name: 'Toyota Fortuner Leader', price: 2200, capacity: '1-5 ท่าน (รวมน้ำมัน)' },
        { type: 'รถตู้ VIP', name: 'Toyota Commuter VIP 10 ที่นั่ง', price: 2500, capacity: '1-10 ท่าน (รวมน้ำมัน)' }
      ],
      itinerary_example: [
        { time: '08:30', spot: 'รับที่โรงแรมในตัวเมืองเชียงใหม่', desc: 'ออกเดินทางมุ่งหน้าสู่อำเภอแม่ออน' },
        { time: '09:45', spot: 'น้ำพุร้อนสันกำแพง', desc: 'ต้มไข่น้ำพุร้อนและแช่เท้าผ่อนคลาย' },
        { time: '11:00', spot: 'หมู่บ้านแม่กำปอง', desc: 'เดินชมวิถีชีวิต ชิมไส้อั่วป้านิด ร้านข้าวซอย' },
        { time: '13:00', spot: 'คาเฟ่ระเบียงวิว / Teddu Coffee', desc: 'จิบกาแฟชมทิวเขาแบบ 360 องศา' },
        { time: '14:30', spot: 'น้ำตกแม่กำปอง / โบสถ์กลางน้ำวัดแม่กำปอง', desc: 'สัมผัสธรรมชาติบริสุทธิ์' },
        { time: '17:00', spot: 'ส่งกลับถึงที่พักในตัวเมืองเชียงใหม่', desc: 'เดินทางกลับอย่างปลอดภัย' }
      ],
      stops_along_way: ['น้ำพุร้อนสันกำแพง', 'ถ้ำเมืองออน', 'Teddu Cafe', 'โครงการหลวงตระกูลสิงห์'],
      includes: ['รถยนต์พร้อมคนขับชำนาญทางดอย', 'ค่าน้ำมันเชื้อเพลิงตลอดทริป', 'ประกันอุบัติเหตุผู้โดยสาร'],
      excludes: ['ค่าเข้าชมสถานที่', 'อาหารและเครื่องดื่ม'],
      booking_steps: [
        '1. ระบุวันที่ต้องการเดินทางไปแม่กำปอง',
        '2. เลือกรถที่ต้องการ (เก๋ง / SUV / รถตู้)',
        '3. ล็อคคิวคนขับผ่าน LINE @mrcarrentcm',
        '4. รถรับถึงหน้าโรงแรมตามเวลานัดหมาย'
      ]
    },
    details_en: {
      pricing_notes: 'Sedan from 1,800 THB | SUV from 2,200 THB | VIP Van from 2,500 THB (Fuel included)',
      suitable_vehicles: [
        { type: 'Sedan', name: 'Toyota Yaris Ativ / Altis', price: 1800, capacity: '1-3 Pax (Fuel Inc.)' },
        { type: 'SUV', name: 'Toyota Fortuner Leader', price: 2200, capacity: '1-5 Pax (Fuel Inc.)' },
        { type: 'VIP Van', name: 'Toyota Commuter VIP', price: 2500, capacity: '1-10 Pax (Fuel Inc.)' }
      ],
      itinerary_example: [
        { time: '08:30', spot: 'Hotel Pickup in Chiang Mai', desc: 'Depart towards Mae On district' },
        { time: '09:45', spot: 'San Kamphaeng Hot Springs', desc: 'Boil eggs & natural foot bath' },
        { time: '11:00', spot: 'Mae Kampong Village', desc: 'Stroll through traditional wooden houses & street food' },
        { time: '13:00', spot: 'Rabiang View Cafe / Teddu Cafe', desc: 'Panoramic mountain coffee time' },
        { time: '14:30', spot: 'Mae Kampong Waterfall & Temple', desc: 'Nature walk & wooden church in stream' },
        { time: '17:00', spot: 'Return to Chiang Mai Hotel', desc: 'Safe arrival back in city' }
      ],
      stops_along_way: ['San Kamphaeng Hot Springs', 'Teddu Coffee', 'Kanta Giant Tree Cafe'],
      includes: ['Vehicle with mountain-certified driver', 'Fuel included', 'Passenger accident insurance'],
      excludes: ['Attraction entrance fees', 'Meals & drinks'],
      booking_steps: [
        '1. Choose your preferred tour date',
        '2. Select Sedan, SUV or VIP Van',
        '3. Confirm via LINE or WhatsApp',
        '4. Driver picks you up at your hotel lobby'
      ]
    },
    faqs: [
      {
        q_th: 'ระยะเวลาเดินทางจากเชียงใหม่ไปแม่กำปองใช้เวลานานเท่าไหร่?',
        q_en: 'How long is the drive from Chiang Mai to Mae Kampong?',
        a_th: 'ใช้เวลาขับรถประมาณ 1 ชั่วโมง 15 นาที ระยะทางประมาณ 50 กิโลเมตร ทางเป็นเนินเขาและโค้งชัน ให้คนขับมืออาชีพของเราดูแลปลอดภัยที่สุดค่ะ',
        a_en: 'It takes approx. 1 hour 15 minutes (50 km). Mountain roads have steep sharp turns, making our private driver the safest choice.'
      }
    ],
    related_routes: [
      { name_th: 'รถไปม่อนแจ่ม', name_en: 'Mon Jam Tour', path: '/mon-jam-car-rental/' },
      { name_th: 'รถไปดอยอินทนนท์', name_en: 'Doi Inthanon Tour', path: '/doi-inthanon-car-rental/' },
      { name_th: 'เหมารถเที่ยวเชียงใหม่ 1 วัน', name_en: 'Chiang Mai Day Trip', path: '/chiang-mai-day-trip/' }
    ]
  },

  '/mon-jam-car-rental/': {
    path: '/mon-jam-car-rental/',
    enPath: '/mon-jam-car-rental/',
    title_th: 'รถไปม่อนแจ่ม ม่อนแจ่มม่อนออน พร้อมคนขับชำนาญทาง | MR Car Rent',
    title_en: 'Chiang Mai to Mon Jam Private Driver & Car Rental | MR Car Rent',
    description_th: 'บริการเหมารถเที่ยวม่อนแจ่ม อ.แม่ริม เชียงใหม่ ชมสวนดอกไม้ ไร่สตอเบอรี่ ดอยม่อนแจ่ม รถใหม่แอร์เย็น คนขับชำนาญทางขึ้นดอย',
    description_en: 'Private car rental with driver from Chiang Mai to Mon Jam. Visit flower gardens, strawberry farms, and mountain viewpoints.',
    keywords_th: 'รถไปม่อนแจ่ม, เหมารถไปม่อนแจ่ม, รถเช่าม่อนแจ่ม, เที่ยวม่อนแจ่มพร้อมคนขับ',
    keywords_en: 'Mon Jam car rental, Chiang Mai to Mon Jam driver, Mon Jam day tour',
    h1_th: 'รถไปม่อนแจ่ม เชียงใหม่ พร้อมคนขับชำนาญทาง รับส่งถึงจุดชมวิว',
    h1_en: 'Chiang Mai to Mon Jam Private Car & Driver Service',
    hero_image: '/images/mon_jam.jpg?v=fixed_20260808',
    price_start: 1800,
    duration_th: '8 ชั่วโมง (1 Day Trip)',
    duration_en: '8 Hours (Full Day)',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '2-8 ใบ',
    pickup_locations_th: ['โรงแรมในตัวเมืองเชียงใหม่', 'สนามบินเชียงใหม่'],
    pickup_locations_en: ['Chiang Mai City Hotels', 'Chiang Mai Airport'],
    service_area_th: 'เชียงใหม่ - อ.แม่ริม - ม่อนแจ่ม - สวนดอกไม้ - สวนพฤกษศาสตร์สมเด็จพระนางเจ้าสิริกิติ์ - ปางช้างแม่สา',
    service_area_en: 'Chiang Mai - Mae Rim - Mon Jam - Queen Sirikit Botanic Garden - Elephant Camps',
    intro_th: 'เที่ยวดอยม่อนแจ่ม อ.แม่ริม สูดอากาศบริสุทธิ์ ชมแปลงดอกไม้หลากสีและวิวยอดดอยแบบพาโนรามา เดินทางด้วยรถเช่าพร้อมคนขับชำนาญทางแม่ริม สะดวก ปลอดภัย ไม่ต้องขับรถขึ้นทางชันเอง แวะจุดถ่ายรูปเช็กอินยอดนิยมตลอดสาย',
    intro_en: 'Escape to Mon Jam hill station in Mae Rim. Enjoy breathtaking mountain views, flower fields, and cooler weather with our comfortable private driver service.',
    details_th: {
      pricing_notes: 'รถเก๋งเริ่มต้น 1,800 บาท | SUV เริ่มต้น 2,200 บาท | รถตู้ VIP เริ่มต้น 2,500 บาท (รวมน้ำมันแล้ว)',
      suitable_vehicles: [
        { type: 'รถเก๋ง', name: 'Toyota Yaris Ativ / Altis', price: 1800, capacity: '1-3 ท่าน (รวมน้ำมัน)' },
        { type: 'รถ SUV', name: 'Toyota Fortuner Leader', price: 2200, capacity: '1-5 ท่าน (รวมน้ำมัน)' },
        { type: 'รถตู้ VIP', name: 'Toyota Commuter VIP 10 ที่นั่ง', price: 2500, capacity: '1-10 ท่าน (รวมน้ำมัน)' }
      ],
      itinerary_example: [
        { time: '08:30', spot: 'รับที่โรงแรมในเชียงใหม่', desc: 'มุ่งหน้าสู่อำเภอแม่ริม' },
        { time: '09:30', spot: 'สวนพฤกษศาสตร์สมเด็จพระนางเจ้าสิริกิติ์', desc: 'เดินชม Canopy Walkway สะพานลอยฟ้า' },
        { time: '11:30', spot: 'ดอยม่อนแจ่ม', desc: 'ชมแปลงดอกไม้ ยอดดอย รับประทานอาหารกลางวัน' },
        { time: '14:00', spot: 'สวนดอกไม้ยิ่งยง / ไอเลิฟฟลาวเวอร์ปาร์ค', desc: 'ถ่ายรูปเช็กอินทุ่งดอกไม้' },
        { time: '16:30', spot: 'เดินทางกลับถึงที่พัก', desc: 'ส่งถึงโรงแรมปลอดภัย' }
      ],
      stops_along_way: ['Canopy Walkway', 'Pongyang Jungle Coaster', 'ยิ่งยงสวนดอกไม้'],
      includes: ['รถยนต์และพนักงานขับรถ', 'ค่าน้ำมันเชื้อเพลิงตลอดทริป', 'ประกันอุบัติเหตุผู้โดยสาร'],
      excludes: ['ค่าเข้าชมสวนดอกไม้และเครื่องเล่น'],
      booking_steps: [
        '1. ทักแชท LINE แจ้งวันที่ไปม่อนแจ่ม',
        '2. เลือกรถที่ชอบ',
        '3. ยืนยันจอง รอนัดหมายคนขับ'
      ]
    },
    details_en: {
      pricing_notes: 'Sedan 1,800 THB | SUV 2,200 THB | VIP Van 2,500 THB (Fuel Included)',
      suitable_vehicles: [
        { type: 'Sedan', name: 'Toyota Yaris Ativ / Altis', price: 1800, capacity: '1-3 Pax' },
        { type: 'SUV', name: 'Toyota Fortuner Leader', price: 2200, capacity: '1-5 Pax' },
        { type: 'VIP Van', name: 'Toyota Commuter VIP', price: 2500, capacity: '1-10 Pax' }
      ],
      includes: ['Vehicle & driver', 'Fuel included', 'Passenger insurance'],
      excludes: ['Entrance fees'],
      booking_steps: ['1. Contact LINE/WhatsApp', '2. Select Vehicle', '3. Enjoy Mon Jam Tour']
    },
    faqs: [
      {
        q_th: 'ช่วงไหนน่าเที่ยวม่อนแจ่มที่สุด?',
        q_en: 'Best time to visit Mon Jam?',
        a_th: 'เที่ยวม่อนแจ่มได้ตลอดทั้งปีค่ะ โดยเฉพาะช่วงเดือนตุลาคม - กุมภาพันธ์ จะมีดอกไม้บานสะพรั่ง อากาศเย็นสบายและมีทะเลหมอกยามเช้า',
        a_en: 'October to February is prime season with blooming flower gardens and cool morning mist.'
      }
    ],
    related_routes: [
      { name_th: 'รถไปแม่กำปอง', name_en: 'Mae Kampong', path: '/mae-kampong-car-rental/' },
      { name_th: 'รถไปดอยอินทนนท์', name_en: 'Doi Inthanon', path: '/doi-inthanon-car-rental/' }
    ]
  },

  '/doi-inthanon-car-rental/': {
    path: '/doi-inthanon-car-rental/',
    enPath: '/doi-inthanon-car-rental/',
    title_th: 'รถไปดอยอินทนนท์ เชียงใหม่ พร้อมคนขับ กิ่วแม่ปาน พระมหาธาตุ | MR Car Rent',
    title_en: 'Chiang Mai to Doi Inthanon Private Driver & Tour | MR Car Rent',
    description_th: 'เหมารถเที่ยวดอยอินทนนท์ จุดสูงสุดในสยาม เดินเส้นทางศึกษาธรรมชาติกิ่วแม่ปาน ชมพระมหาธาตุนภเมทนีดล รถปลอดภัย สภาพใหม่ คนขับชำนาญทาง',
    description_en: 'Private car rental with driver to Doi Inthanon National Park. Highest peak of Thailand, Kew Mae Pan trail, Wachirathan waterfall.',
    keywords_th: 'รถไปดอยอินทนนท์, เหมารถไปดอยอินทนนท์, รถเช่าดอยอินทนนท์, รถเที่ยวอินทนนท์พร้อมคนขับ',
    keywords_en: 'Doi Inthanon car rental, Chiang Mai to Doi Inthanon driver, Doi Inthanon private tour',
    h1_th: 'รถไปดอยอินทนนท์จากเชียงใหม่ พร้อมคนขับชำนาญทาง จุดสูงสุดในสยาม',
    h1_en: 'Private Car & Driver from Chiang Mai to Doi Inthanon National Park',
    hero_image: '/images/doi_inthanon.jpg?v=fixed_20260808',
    price_start: 2200,
    duration_th: '9-10 ชั่วโมง (1 Day Trip)',
    duration_en: '9-10 Hours (Full Day)',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '2-8 ใบ',
    pickup_locations_th: ['โรงแรมในตัวเมืองเชียงใหม่', 'สนามบินเชียงใหม่ (CNX)'],
    pickup_locations_en: ['Chiang Mai Hotels', 'Chiang Mai Airport'],
    service_area_th: 'เชียงใหม่ - อ.จอมทอง - ยอดดอยอินทนนท์ - เส้นทางกิ่วแม่ปาน - พระมหาธาตุนภเมทนีดล - น้ำตกวชิรธาร - ตลาดม้ง',
    service_area_en: 'Chiang Mai - Chom Thong - Highest Point - Kew Mae Pan - Twin Royal Pagodas - Wachirathan Waterfall',
    intro_th: 'พิชิตยอดดอยอินทนนท์ จุดสูงสุดในประเทศไทย สูดอากาศบริสุทธิ์เย็นสบายตลอดปี เดินป่ากิ่วแม่ปาน ชมพระมหาธาตุนภเมทนีดลและพระมหาธาตุนภพลภูมิสิริ ด้วยบริการรถเช่าพร้อมคนขับท้องถิ่น ปลอดภัย นั่งสบาย รถกำลังเครื่องแรงขึ้นดอยสบาย',
    intro_en: 'Travel to Thailand\'s highest peak at Doi Inthanon National Park (2,565m). Experience cool mountain temperatures, lush cloud forests, stunning Royal Twin Pagodas, and waterfalls with our expert local driver.',
    details_th: {
      pricing_notes: 'รถเก๋งเริ่มต้น 2,200 บาท | SUV เริ่มต้น 2,500 บาท | รถตู้ VIP เริ่มต้น 2,800 บาท (รวมค่าน้ำมันเชื้อเพลิงแล้ว)',
      suitable_vehicles: [
        { type: 'รถเก๋ง', name: 'Toyota Yaris Ativ / Altis', price: 2200, capacity: '1-3 ท่าน (รวมน้ำมัน)' },
        { type: 'รถ SUV', name: 'Toyota Fortuner Leader', price: 2500, capacity: '1-5 ท่าน (รวมน้ำมัน)' },
        { type: 'รถตู้ VIP', name: 'Toyota Commuter VIP 10 ที่นั่ง', price: 2800, capacity: '1-10 ท่าน (รวมน้ำมัน)' }
      ],
      itinerary_example: [
        { time: '07:00', spot: 'รับที่โรงแรมในเชียงใหม่', desc: 'ออกเดินทางเช้าเพื่อสัมผัสอากาศเย็น' },
        { time: '09:00', spot: 'ยอดดอยอินทนนท์ & เส้นทางหมุดสูงสุด', desc: 'ถ่ายรูปจุดสูงสุดในสยาม 2,565 เมตร' },
        { time: '10:00', spot: 'เส้นทางศึกษาธรรมชาติกิ่วแม่ปาน', desc: 'เดินป่าชมทะเลหมอกและกุหลาบพันปี (พ.ย.-ม.ค.)' },
        { time: '12:30', spot: 'พระมหาธาตุนภเมทนีดล-นภพลภูมิสิริ', desc: 'ชมสวนดอกไม้และสถาปัตยกรรมสวยงาม' },
        { time: '14:30', spot: 'ตลาดม้ง & น้ำตกวชิรธาร', desc: 'ซื้อของฝากผลไม้สด และถ่ายรูปน้ำตกใหญ่' },
        { time: '17:30', spot: 'ส่งกลับถึงที่พักในเชียงใหม่', desc: 'เดินทางกลับถึงเมืองโดยสวัสดิภาพ' }
      ],
      stops_along_way: ['น้ำตกวชิรธาร', 'สถานีเกษตรหลวงอินทนนท์', 'ตลาดม้ง', 'แม่กลางหลวง'],
      includes: ['รถยนต์พร้อมคนขับชำนาญทางดอยอินทนนท์', 'ค่าน้ำมันเชื้อเพลิงตลอดทริป', 'ประกันภัยผู้โดยสาร'],
      excludes: ['ค่าธรรมเนียมเข้าอุทยานแห่งชาติดอยอินทนนท์', 'ค่าไกด์ท้องถิ่นกิ่วแม่ปาน (200 บ./กลุ่ม)'],
      booking_steps: [
        '1. ทักแชท LINE ระบุวันเดินทางไปดอยอินทนนท์',
        '2. เลือกรถที่เหมาะสมกับคณะ',
        '3. คนขับบริการรับส่งถึงที่พัก'
      ]
    },
    details_en: {
      pricing_notes: 'Sedan 2,200 THB | SUV 2,500 THB | VIP Van 2,800 THB (Fuel Included)',
      suitable_vehicles: [
        { type: 'Sedan', name: 'Toyota Yaris Ativ / Altis', price: 2200, capacity: '1-3 Pax' },
        { type: 'SUV', name: 'Toyota Fortuner Leader', price: 2500, capacity: '1-5 Pax' },
        { type: 'VIP Van', name: 'Toyota Commuter VIP', price: 2800, capacity: '1-10 Pax' }
      ],
      includes: ['Vehicle & driver', 'Fuel included', 'Insurance'],
      excludes: ['National Park entrance fees'],
      booking_steps: ['1. Contact LINE/WhatsApp', '2. Select Vehicle', '3. Confirm Booking']
    },
    faqs: [
      {
        q_th: 'ค่าเข้าอุทยานแห่งชาติดอยอินทนนท์คนละเท่าไหร่?',
        q_en: 'How much are national park entry fees?',
        a_th: 'คนไทย: ผู้ใหญ่ 60 บาท เด็ก 30 บาท ค่ารถยนต์ 30 บาท | ต่างชาติ: ผู้ใหญ่ 300 บาท เด็ก 150 บาท ค่ารถยนต์ 30 บาท (ชำระหน้าด่านอุทยานค่ะ)',
        a_en: 'Foreigners: Adult 300 THB, Child 150 THB, Vehicle 30 THB (Paid at park entrance gate).'
      }
    ],
    related_routes: [
      { name_th: 'รถไปแม่กำปอง', name_en: 'Mae Kampong', path: '/mae-kampong-car-rental/' },
      { name_th: 'รถเชียงใหม่ไปเชียงราย', name_en: 'Chiang Rai Tour', path: '/chiang-mai-to-chiang-rai/' }
    ]
  },

  '/doi-suthep-car-rental/': {
    path: '/doi-suthep-car-rental/',
    enPath: '/doi-suthep-car-rental/',
    title_th: 'รถไปดอยสุเทพ พระธาตุดอยคำ ไหว้พระ 9 วัดเชียงใหม่ | MR Car Rent',
    title_en: 'Doi Suthep & Wat Doi Kham Private Driver Tour | MR Car Rent',
    description_th: 'เหมารถขึ้นดอยสุเทพ พระธาตุดอยคำ หลวงพ่อทันใจ ไหว้พระ 9 วัดดังเชียงใหม่ บริการพร้อมคนขับท้องถิ่น มารยาทดี นั่งสบาย',
    description_en: 'Private car rental with driver for Doi Suthep Temple, Phu Ping Palace, Wat Doi Kham & 9 Sacred Temples tour in Chiang Mai.',
    keywords_th: 'รถไปดอยสุเทพ, เหมารถไปดอยสุเทพ, รถขึ้นดอยสุเทพ, รถไปวัดพระธาตุดอยคำ',
    keywords_en: 'Doi Suthep car rental, Doi Suthep driver, Wat Doi Kham private tour',
    h1_th: 'รถไปดอยสุเทพ พระธาตุดอยคำ เชียงใหม่ พร้อมคนขับชำนาญทาง',
    h1_en: 'Doi Suthep & Temple Private Car with Driver Service',
    hero_image: '/images/doi_suthep.jpg?v=fixed_20260808',
    price_start: 1200,
    duration_th: '4-8 ชั่วโมง (Half Day / Full Day)',
    duration_en: '4-8 Hours (Half Day / Full Day)',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '2-8 ใบ',
    pickup_locations_th: ['โรงแรมในเชียงใหม่', 'สนามบินเชียงใหม่'],
    pickup_locations_en: ['Chiang Mai Hotels', 'Chiang Mai Airport'],
    service_area_th: 'เชียงใหม่ - วัดพระธาตุดอยสุเทพ - พระตำหนักภูพิงคราชนิเวศน์ - บ้านขุนช่างเคี่ยน - วัดพระธาตุดอยคำ - วัดอุโมงค์',
    service_area_en: 'Doi Suthep Temple - Bhubing Palace - Khun Chang Kian - Wat Doi Kham - Wat Umong',
    intro_th: 'กราบสักการะองค์พระธาตุดอยสุเทพ ปูชนียสถานคู่บ้านคู่เมืองเชียงใหม่ และหลวงพ่อทันใจ วัดพระธาตุดอยคำ ด้วยบริการรถเช่าพร้อมคนขับชำนาญเส้นทางโค้งดอยสุเทพ ปลอดภัย แอร์เย็นฉ่ำ เหมาะสำหรับสายบุญ ครอบครัว และนักท่องเที่ยวทุกท่าน',
    intro_en: 'Visit Chiang Mai\'s most famous landmark, Wat Phra That Doi Suthep, perched on the mountain overlooking the city, and pray for fortune at Wat Phra That Doi Kham with our reliable driver.',
    details_th: {
      pricing_notes: 'ครึ่งวันเริ่มต้น 1,200 บาท | เต็มวันเริ่มต้น 1,500 บาท (รวมน้ำมันเชื้อเพลิงแล้ว)',
      suitable_vehicles: [
        { type: 'รถเก๋ง', name: 'Toyota Yaris Ativ / Altis', price: 1200, capacity: '1-3 ท่าน (ครึ่งวัน)' },
        { type: 'รถ SUV', name: 'Toyota Fortuner Leader', price: 1600, capacity: '1-5 ท่าน (ครึ่งวัน)' },
        { type: 'รถตู้ VIP', name: 'Toyota Commuter VIP 10 ที่นั่ง', price: 1800, capacity: '1-10 ท่าน (ครึ่งวัน)' }
      ],
      itinerary_example: [
        { time: '08:30', spot: 'รับที่โรงแรมในเชียงใหม่', desc: 'มุ่งหน้าขึ้นดอยสุเทพ' },
        { time: '09:15', spot: 'วัดพระธาตุดอยสุเทพราชวรวิหาร', desc: 'กราบพระธาตุและชมวิวทิวทัศน์เมืองเชียงใหม่' },
        { time: '11:00', spot: 'พระตำหนักภูพิงคราชนิเวศน์', desc: 'ชมสวนดอกไม้เมืองหนาวงามสะพรั่ง' },
        { time: '13:00', spot: 'วัดพระธาตุดอยคำ', desc: 'กราบขอพรหลวงพ่อทันใจ ถวายดอกมะลิ' },
        { time: '15:00', spot: 'วัดอุโมงค์ (สวนพุทธธรรม)', desc: 'เดินชมอุโมงค์โบราณศตวรรษที่ 14' }
      ],
      stops_along_way: ['วัดอุโมงค์', 'วัดผาลาด (วัดสกทาคามี)', 'วัดศรีสุพรรณ'],
      includes: ['รถยนต์พร้อมคนขับ', 'ค่าน้ำมันเชื้อเพลิง', 'ประกันภัยผู้โดยสาร'],
      excludes: ['ค่าเข้าชมสถานที่ (ถ้ามี)', 'ดอกไม้ธูปเทียน'],
      booking_steps: ['1. ทักแชท LINE', '2. เลือกรอบเวลา', '3. ล็อคคิวคนขับ']
    },
    details_en: {
      pricing_notes: 'Half-Day from 1,200 THB | Full-Day from 1,500 THB (Fuel Included)',
      suitable_vehicles: [
        { type: 'Sedan', name: 'Toyota Yaris Ativ / Altis', price: 1200, capacity: '1-3 Pax' },
        { type: 'SUV', name: 'Toyota Fortuner Leader', price: 1600, capacity: '1-5 Pax' },
        { type: 'VIP Van', name: 'Toyota Commuter VIP', price: 1800, capacity: '1-10 Pax' }
      ],
      includes: ['Vehicle & driver', 'Fuel included', 'Insurance'],
      excludes: ['Entrance fees'],
      booking_steps: ['1. Contact LINE/WhatsApp', '2. Choose Time', '3. Confirm Booking']
    },
    faqs: [
      {
        q_th: 'วัดพระธาตุดอยสุเทพเปิดกี่โมง?',
        q_en: 'Opening hours of Doi Suthep Temple?',
        a_th: 'เปิดบริการทุกวันเวลา 06:00 - 20:00 น. มีลิฟต์เคเบิ้ลคาร์สำหรับผู้สูงอายุและผู้ไม่สะดวกเดินบันไดนาค 306 ขั้นค่ะ',
        a_en: 'Open daily from 06:00 to 20:00. Cable car available for seniors.'
      }
    ],
    related_routes: [
      { name_th: 'รถรับส่งสนามบิน', name_en: 'Airport Transfer', path: '/chiang-mai-airport-transfer/' },
      { name_th: 'เหมารถเที่ยวเชียงใหม่ 1 วัน', name_en: 'Chiang Mai Day Trip', path: '/chiang-mai-day-trip/' }
    ]
  },

  '/chiang-mai-to-chiang-rai/': {
    path: '/chiang-mai-to-chiang-rai/',
    enPath: '/en/chiang-mai-to-chiang-rai/',
    title_th: 'รถเชียงใหม่ไปเชียงราย พร้อมคนขับ วัดร่องขุ่น วัดร่องเสือเต้น | MR Car Rent',
    title_en: 'Chiang Mai to Chiang Rai Private Transfer & Day Trip | White Temple',
    description_th: 'บริการเหมารถจากเชียงใหม่ไปเชียงราย 1 วัน หรือค้างคืน เที่ยววัดร่องขุ่น สิงห์ปาร์ค ดอยช้าง คนขับชำนาญทาง ปลอดภัย นั่งสบาย',
    description_en: 'Day trip & transfer from Chiang Mai to Chiang Rai White Temple, Blue Temple & Black House with safe private driver.',
    keywords_th: 'รถเชียงใหม่ไปเชียงราย, เหมารถไปเชียงราย, รถพร้อมคนขับเชียงราย, เที่ยวเชียงรายจากเชียงใหม่',
    keywords_en: 'Chiang Mai to Chiang Rai car, Chiang Rai day trip private car, White Temple transfer',
    h1_th: 'รถเชียงใหม่ไปเชียงราย พร้อมคนขับชำนาญทาง เที่ยววันเดียวครบ',
    h1_en: 'Chiang Mai to Chiang Rai Private Driver & Day Tour',
    hero_image: '/images/chiang_rai.jpg?v=fixed_20260808',
    price_start: 2500,
    duration_th: '11-12 ชั่วโมง (Full Day Trip)',
    duration_en: '11-12 Hours (Full Day Trip)',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '2-8 ใบ',
    pickup_locations_th: ['โรงแรมในเชียงใหม่', 'สนามบินเชียงใหม่'],
    pickup_locations_en: ['Chiang Mai Hotels', 'Chiang Mai Airport'],
    service_area_th: 'เชียงใหม่ - แม่ขะจาน - เชียงราย - วัดร่องขุ่น - วัดร่องเสือเต้น - บ้านดำ - สิงห์ปาร์ค - ดอยช้าง',
    service_area_en: 'Chiang Mai - Hot Spring - Chiang Rai - White Temple - Blue Temple - Black House - Singha Park',
    intro_th: 'สัมผัสความงดงามแห่งศิลปะเชียงราย ด้วยทริปเหมารถพร้อมคนขับเดินทางจากเชียงใหม่ แวะน้ำพุร้อนแม่ขะจาน ชมวัดร่องขุ่นอันงดงาม วัดร่องเสือเต้นสีน้ำเงินตระการตา และพิพิธภัณฑ์บ้านดำ รถสภาพใหม่ แอร์เย็น คนขับชำนาญทางปลอดภัยตลอดเส้นทางสายเชียงราย',
    intro_en: 'Explore Chiang Rai\'s world-famous architectural wonders including the White Temple (Wat Rong Khun), Blue Temple, and Black House on a comfortable private day trip directly from Chiang Mai.',
    details_th: {
      pricing_notes: 'รถเก๋งเริ่มต้น 2,500 บาท | SUV เริ่มต้น 3,000 บาท | รถตู้ VIP เริ่มต้น 3,500 บาท (รวมค่าน้ำมันเชื้อเพลิงแล้ว)',
      suitable_vehicles: [
        { type: 'รถเก๋ง', name: 'Toyota Yaris Ativ / Altis', price: 2500, capacity: '1-3 ท่าน (รวมน้ำมัน)' },
        { type: 'รถ SUV', name: 'Toyota Fortuner Leader', price: 3000, capacity: '1-5 ท่าน (รวมน้ำมัน)' },
        { type: 'รถตู้ VIP', name: 'Toyota Commuter VIP 10 ที่นั่ง', price: 3500, capacity: '1-10 ท่าน (รวมน้ำมัน)' }
      ],
      itinerary_example: [
        { time: '07:00', spot: 'รับที่โรงแรมในเชียงใหม่', desc: 'ออกเดินทางเช้า มุ่งหน้าสู่เชียงราย' },
        { time: '08:30', spot: 'น้ำพุร้อนแม่ขะจาน', desc: 'พักสายตา แช่เท้า ต้มไข่น้ำพุร้อน' },
        { time: '10:30', spot: 'วัดร่องขุ่น (White Temple)', desc: 'ชมพุทธศิลป์สีขาวบริสุทธิ์สร้างโดยอาจารย์เฉลิมชัย' },
        { time: '12:30', spot: 'วัดร่องเสือเต้น (Blue Temple)', desc: 'ชมพระวิหารสีเงินน้ำเงินล้ำค่า & รับประทานอาหาร' },
        { time: '14:00', spot: 'พิพิธภัณฑ์บ้านดำ', desc: 'ชมผลงานศิลปะพื้นบ้านของอาจารย์ถวัลง์ ดัชนี' },
        { time: '15:30', spot: 'สิงห์ปาร์ค (ไร่บุญรอด)', desc: 'ถ่ายรูปไร่ชาและสิงห์ทองคำยักษ์' },
        { time: '19:30', spot: 'ส่งกลับถึงที่พักในเชียงใหม่', desc: 'เดินทางกลับถึงเชียงใหม่ปลอดภัย' }
      ],
      stops_along_way: ['น้ำพุร้อนแม่ขะจาน', 'วัดห้วยปลากั้ง', 'ไร่ชาฉุยฟง', 'ดอยช้าง'],
      includes: ['รถยนต์พร้อมคนขับชำนาญทางเชียงราย', 'ค่าน้ำมันเชื้อเพลิงตลอดทริป', 'ประกันภัยผู้โดยสาร'],
      excludes: ['ค่าธรรมเนียมเข้าชมสถานที่'],
      booking_steps: ['1. ทักแชท LINE', '2. เลือกรถที่ชอบ', '3. ล็อคคิวทริปเชียงราย']
    },
    details_en: {
      pricing_notes: 'Sedan 2,500 THB | SUV 3,000 THB | VIP Van 3,500 THB (Fuel Included)',
      suitable_vehicles: [
        { type: 'Sedan', name: 'Toyota Yaris Ativ / Altis', price: 2500, capacity: '1-3 Pax' },
        { type: 'SUV', name: 'Toyota Fortuner Leader', price: 3000, capacity: '1-5 Pax' },
        { type: 'VIP Van', name: 'Toyota Commuter VIP', price: 3500, capacity: '1-10 Pax' }
      ],
      includes: ['Vehicle & driver', 'Fuel included', 'Insurance'],
      excludes: ['Entrance fees'],
      booking_steps: ['1. Contact LINE/WhatsApp', '2. Select Vehicle', '3. Confirm Tour']
    },
    faqs: [
      {
        q_th: 'ระยะเวลาเดินทางจากเชียงใหม่ไปเชียงรายนานเท่าไหร่?',
        q_en: 'How long is the drive from Chiang Mai to Chiang Rai?',
        a_th: 'ประมาณ 3 ชั่วโมงต่อเที่ยว (ระยะทางประมาณ 185 กิโลเมตร) โดยมีจุดพักแวะน้ำพุร้อนแม่ขะจานระหว่างทางผ่อนคลายความเมื่อยล้าค่ะ',
        a_en: 'Approx. 3 hours each way (185 km) with a hot spring rest stop along the way.'
      }
    ],
    related_routes: [
      { name_th: 'รถเชียงใหม่ไปปาย', name_en: 'Pai Transfer', path: '/chiang-mai-to-pai/' },
      { name_th: 'รถไปดอยอินทนนท์', name_en: 'Doi Inthanon', path: '/doi-inthanon-car-rental/' }
    ]
  },

  '/chiang-mai-to-pai/': {
    path: '/chiang-mai-to-pai/',
    enPath: '/en/chiang-mai-to-pai/',
    title_th: 'รถเชียงใหม่ไปปาย แม่ฮ่องสอน พร้อมคนขับชำนาญ 762 โค้ง | MR Car Rent',
    title_en: 'Chiang Mai to Pai Private Car & Van Transfer | Skilled Mountain Driver',
    description_th: 'บริการเหมารถจากเชียงใหม่ไปปาย - บ้านรักไทย แม่ฮ่องสอน คนขับชำนาญเส้นทาง 762 โค้ง ไม่เมารถ ขับนิ่ม ปลอดภัยสูงสุด',
    description_en: 'Safe mountain transfer from Chiang Mai to Pai & Ban Rak Thai. Experienced local driver for 762 curves.',
    keywords_th: 'รถเชียงใหม่ไปปาย, เหมารถไปปาย, รถไปบ้านรักไทย, รถพร้อมคนขับไปปาย',
    keywords_en: 'Chiang Mai to Pai car, Pai private transfer, Ban Rak Thai driver',
    h1_th: 'รถเชียงใหม่ไปปาย - บ้านรักไทย พร้อมคนขับชำนาญ 762 โค้ง',
    h1_en: 'Chiang Mai to Pai & Ban Rak Thai Private Driver Transfer',
    hero_image: '/images/ban_rak_thai.jpg?v=fixed_20260808',
    price_start: 2800,
    duration_th: 'เหมาส่งเที่ยวเดียว หรือเหมารวมทริปค้างคืน',
    duration_en: 'One-way transfer or Multi-day tour',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '2-8 ใบ',
    pickup_locations_th: ['โรงแรมในเชียงใหม่', 'สนามบินเชียงใหม่ (CNX)'],
    pickup_locations_en: ['Chiang Mai Hotels', 'Chiang Mai Airport'],
    service_area_th: 'เชียงใหม่ - อ.แม่แตง - อ.ปาย - กองลานปาย - สะพานประวัติศาสตร์ปาย - บ้านรักไทย - ตัวเมืองแม่ฮ่องสอน',
    service_area_en: 'Chiang Mai - Mae Taeng - Pai Town - Pai Canyon - Ban Rak Thai - Mae Hong Son',
    intro_th: 'พิชิต 762 โค้งสู่เมืองปายและบ้านรักไทย จ.แม่ฮ่องสอน อย่างสบายใจ ไม่เมารถ ด้วยพนักงานขับรถผู้เชี่ยวชาญเส้นทางเขาและทางโค้งเป็นพิเศษ ขับรถนุ่มนวล รู้วิธีใช้เกียร์ขึ้นลงดอย รถสะอาด ปรับเบาะนอนสบาย พร้อมแวะสถานที่สวยงามระหว่างทาง',
    intro_en: 'Conquer the famous 762 mountain curves to Pai & Ban Rak Thai without motion sickness! Our drivers are master navigators of Northern Thailand\'s mountain passes, delivering a smooth, safe ride.',
    details_th: {
      pricing_notes: 'เหมารับส่งเชียงใหม่-ปาย เที่ยวเดียว เริ่มต้น 2,800 บาท | เหมาวันเที่ยวค้างคืน ปาย-บ้านรักไทย เริ่มต้น 3,000 - 3,500 บาท/วัน (รวมน้ำมันแล้ว)',
      suitable_vehicles: [
        { type: 'รถเก๋ง', name: 'Toyota Yaris Ativ / Altis', price: 2800, capacity: '1-3 ท่าน' },
        { type: 'รถ SUV', name: 'Toyota Fortuner Leader', price: 3200, capacity: '1-5 ท่าน' },
        { type: 'รถตู้ VIP', name: 'Toyota Commuter VIP 10 ที่นั่ง', price: 3500, capacity: '1-10 ท่าน' }
      ],
      itinerary_example: [
        { time: '08:00', spot: 'รับที่เชียงใหม่', desc: 'มุ่งหน้าทางหลวง 1095 สู่อำเภอปาย' },
        { time: '10:00', spot: 'จุดชมวิวกิ่วลม', desc: 'พักสายตา ถ่ายรูปสายลมทะเลหมอก' },
        { time: '11:30', spot: 'สะพานประวัติศาสตร์ท่าปาย', desc: 'จุดเช็กอินทางเข้าเมืองปาย' },
        { time: '12:30', spot: 'กองลานปาย (Pai Canyon)', desc: 'ชมทัศนียภาพหินโตรกธรรมชาติ' },
        { time: '14:30', spot: 'หมู่บ้านสันติชล (จีนยูนนาน)', desc: 'ชิมชาขาหมูหมั่นโถว นั่งชิงช้าไม้' },
        { time: '16:30', spot: 'ส่งถึงที่พักในปาย / เดินทางต่อไปบ้านรักไทย', desc: 'พักผ่อนตามอัธยาศัย' }
      ],
      stops_along_way: ['สะพานประวัติศาสตร์ปาย', 'กองลานปาย', 'หมู่บ้านสันติชล', 'ปายอินเลิฟ'],
      includes: ['รถยนต์พร้อมคนขับชำนาญทางโค้งปาย', 'ค่าน้ำมันเชื้อเพลิงตลอดเส้นทาง', 'ประกันภัยผู้โดยสาร'],
      excludes: ['ที่พักของลูกค้า', 'ค่าอาหาร'],
      booking_steps: ['1. ทักแชท LINE แจ้งแผนเดินทาง', '2. เลือกรถที่ต้องการ', '3. ล็อคคิวคนขับ']
    },
    details_en: {
      pricing_notes: 'One-Way Transfer from 2,800 THB | Multi-day custom tour 3,000-3,500 THB/day (Fuel Included)',
      suitable_vehicles: [
        { type: 'Sedan', name: 'Toyota Yaris Ativ / Altis', price: 2800, capacity: '1-3 Pax' },
        { type: 'SUV', name: 'Toyota Fortuner Leader', price: 3200, capacity: '1-5 Pax' },
        { type: 'VIP Van', name: 'Toyota Commuter VIP', price: 3500, capacity: '1-10 Pax' }
      ],
      includes: ['Vehicle & driver expert in 762 curves', 'Fuel included', 'Insurance'],
      excludes: ['Hotel accommodations', 'Meals'],
      booking_steps: ['1. Contact via LINE/WhatsApp', '2. Choose One-Way or Multi-Day', '3. Confirm Booking']
    },
    faqs: [
      {
        q_th: 'เดินทางจากเชียงใหม่ไปปายใช้เวลาขับรถกี่ชั่วโมง?',
        q_en: 'How long does it take from Chiang Mai to Pai?',
        a_th: 'ใช้เวลาประมาณ 3 ชั่วโมง - 3.5 ชั่วโมง (ระยะทาง 130 กม. มี 762 โค้ง) คนขับจะขับนิ่มนวลและมีจุดแวะพักเข้าห้องน้ำกลางทางค่ะ',
        a_en: 'Approx. 3 to 3.5 hours (130 km). Driver drives smoothly and makes rest stops as needed.'
      }
    ],
    related_routes: [
      { name_th: 'รถเชียงใหม่ไปเชียงราย', name_en: 'Chiang Rai Transfer', path: '/chiang-mai-to-chiang-rai/' },
      { name_th: 'รถไปแม่กำปอง', name_en: 'Mae Kampong Tour', path: '/mae-kampong-car-rental/' }
    ]
  },

  '/chiang-mai-day-trip/': {
    path: '/chiang-mai-day-trip/',
    enPath: '/en/chiang-mai-day-trip/',
    title_th: 'เหมารถเที่ยวเชียงใหม่ 1 วัน พร้อมคนขับ ปรับแผนเที่ยวได้ตามใจ | MR Car Rent',
    title_en: 'Private Chiang Mai Custom Day Tour & Sightseeing Driver | MR Car Rent',
    description_th: 'บริการเหมารถเที่ยวเชียงใหม่ 1 วัน จัดทริปเองได้หรือให้เราช่วยวางแผน คนขับบริการดี สุภาพ ช่วยถ่ายรูป เช็กราคาโปรโมชั่นพิเศษ',
    description_en: 'Custom private day tours in Chiang Mai. Explore Doi Inthanon, Mae Kampong, Mon Jam & Temples with a dedicated driver.',
    keywords_th: 'เหมารถเที่ยวเชียงใหม่ 1 วัน, เหมารถเชียงใหม่, รถนำเที่ยวเชียงใหม่, รถเที่ยวเชียงใหม่พร้อมคนขับ',
    keywords_en: 'Chiang Mai day trip, Chiang Mai custom tour, private sightseeing Chiang Mai',
    h1_th: 'เหมารถเที่ยวเชียงใหม่ 1 วัน พร้อมคนขับสุภาพ อิสระ ปรับแผนได้',
    h1_en: 'Private Chiang Mai Day Trip & Sightseeing Service',
    hero_image: '/images/hero_chiangmai_car.jpg?v=fixed_20260808',
    price_start: 1200,
    duration_th: '8-10 ชั่วโมง / วัน',
    duration_en: '8-10 Hours / Day',
    capacity_passengers: '1-10 ท่าน',
    capacity_luggage: '2-8 ใบ',
    pickup_locations_th: ['โรงแรมในเชียงใหม่', 'สนามบินเชียงใหม่ (CNX)'],
    pickup_locations_en: ['Chiang Mai Hotels', 'Chiang Mai Airport'],
    service_area_th: 'ทั่วจังหวัดเชียงใหม่ (ตัวเมือง, แม่ริม, หางดง, แม่ออน, จอมทอง, แม่แตง)',
    service_area_en: 'All Chiang Mai Districts (City, Mae Rim, Hang Dong, Mae On, Chom Thong)',
    intro_th: 'วางแผนเที่ยวเชียงใหม่ในแบบของคุณเอง ไม่ต้องง้อทัวร์จอย ไม่ต้องเร่งรีบ ด้วยบริการเหมารถเที่ยวเชียงใหม่ 1 วัน พร้อมพนักงานขับรถท้องถิ่นสุภาพ บริการด้วยใจ ช่วยแนะนำร้านอร่อย ถ่ายรูปสวย และอำนวยความสะดวกตลอดวัน',
    intro_en: 'Design your dream itinerary in Chiang Mai with a private dedicated car and driver. Visit temples, cafes, waterfalls, or elephant sanctuaries at your own flexible pace without rushing.',
    details_th: {
      pricing_notes: 'รถเก๋งเริ่มต้น 1,200 บ. | รถ SUV เริ่มต้น 1,800 บ. | รถตู้ VIP เริ่มต้น 2,200 บ. (ไม่รวมน้ำมัน หรือรวมน้ำมันเหมาจ่ายตามโปรแกรม)',
      suitable_vehicles: [
        { type: 'รถเก๋ง', name: 'Toyota Yaris Ativ / Altis', price: 1200, capacity: '1-4 ท่าน' },
        { type: 'รถ SUV', name: 'Toyota Fortuner Leader', price: 1800, capacity: '1-6 ท่าน' },
        { type: 'รถตู้ VIP', name: 'Toyota Commuter VIP 10 ที่นั่ง', price: 2200, capacity: '1-10 ท่าน' }
      ],
      itinerary_example: [
        { time: '08:30', spot: 'รับที่ที่พักในเชียงใหม่', desc: 'ออกเดินทางตามโปรแกรมที่เลือก' },
        { time: '09:30', spot: 'ท่องเที่ยวจุดแรก', desc: 'เช่น คาเฟ่แม่ริม / วัดดอยสุเทพ / แม่กำปอง' },
        { time: '12:00', spot: 'รับประทานอาหารกลางวัน', desc: 'คนขับแนะนำร้านอาหารท้องถิ่นรสเด็ด' },
        { time: '13:30', spot: 'ท่องเที่ยวจุดที่สองและสาม', desc: 'ถ่ายรูปเช็กอิน ชมธรรมชาติ' },
        { time: '17:30', spot: 'ส่งกลับถึงที่พัก หรือ ตลาดไนท์บาซาร์', desc: 'จบทริปอย่างประทับใจ' }
      ],
      stops_along_way: ['จัดแผนได้ตามใจลูกค้า 100%'],
      includes: ['รถยนต์พร้อมคนขับส่วนตัว 1 วัน', 'ประกันภัยอุบัติเหตุผู้โดยสาร', 'น้ำดื่มฟรี'],
      excludes: ['ค่าน้ำมันเชื้อเพลิง (ตามใช้จริงหรือตามเหมา)', 'ค่าเข้าชมสถานที่'],
      booking_steps: ['1. ทักแชท LINE @mrcarrentcm', '2. แจ้งจุดที่ต้องการไป', '3. ล็อคคิวรับโปรพิเศษ']
    },
    details_en: {
      pricing_notes: 'Sedan from 1,200 THB | SUV from 1,800 THB | VIP Van from 2,200 THB',
      suitable_vehicles: [
        { type: 'Sedan', name: 'Toyota Yaris Ativ / Altis', price: 1200, capacity: '1-4 Pax' },
        { type: 'SUV', name: 'Toyota Fortuner Leader', price: 1800, capacity: '1-6 Pax' },
        { type: 'VIP Van', name: 'Toyota Commuter VIP', price: 2200, capacity: '1-10 Pax' }
      ],
      includes: ['Private car & driver for 1 full day', 'Passenger insurance', 'Complimentary water'],
      excludes: ['Fuel (pay as used or all-inclusive quote)', 'Attraction fees'],
      booking_steps: ['1. Contact on LINE/WhatsApp', '2. Share your list of spots', '3. Confirm driver']
    },
    faqs: [
      {
        q_th: 'หากยังไม่มีแพลน คนขับช่วยแนะนำสถานที่เที่ยวให้ได้ไหม?',
        q_en: 'Can the driver suggest an itinerary?',
        a_th: 'ได้เลยค่ะ! คนขับของเราเป็นคนท้องถิ่นชำนาญทาง สามารถช่วยจัดเส้นทางที่ไม่อ้อม และจัดสรรเวลาให้เที่ยวได้คุ้มค่าที่สุด',
        a_en: 'Yes! Our local drivers can help arrange the most efficient route and recommend top hidden gems.'
      }
    ],
    related_routes: [
      { name_th: 'รถไปแม่กำปอง', name_en: 'Mae Kampong', path: '/mae-kampong-car-rental/' },
      { name_th: 'รถไปม่อนแจ่ม', name_en: 'Mon Jam', path: '/mon-jam-car-rental/' },
      { name_th: 'รถไปดอยอินทนนท์', name_en: 'Doi Inthanon', path: '/doi-inthanon-car-rental/' }
    ]
  }
};
