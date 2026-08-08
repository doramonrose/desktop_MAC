import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  th: {
    'nav.home': 'หน้าแรก',
    'nav.vehicles': 'รถและราคา',
    'nav.packages': 'แพ็กเกจท่องเที่ยว',
    'nav.airport': 'รับส่งสนามบิน',
    'nav.reviews': 'รีวิวลูกค้า',
    'nav.faq': 'คำถามที่พบบ่อย',
    'nav.about': 'เกี่ยวกับเรา',
    'nav.contact': 'ติดต่อเรา',
    'nav.btn_quote': 'เช็กคิวและขอราคา',
    'hero.badge': 'รถเช่าพร้อมคนขับ เชียงใหม่ - มืออาชีพ ซื่อสัตย์ ปลอดภัย',
    'hero.title': 'รถเช่าพร้อมคนขับเชียงใหม่ เที่ยวสบาย ปลอดภัย ราคาชัดเจน',
    'hero.subtitle': 'บริการรถเก๋ง SUV และรถตู้ พร้อมคนขับชำนาญเส้นทาง รับสนามบิน เหมาท่องเที่ยว และเดินทางต่างจังหวัด',
    'hero.price_start': 'เริ่มต้นเพียง 1,200 บาท/วัน',
    'hero.cta_quote': 'เช็กคิวและขอราคาฟรี',
    'hero.cta_vehicles': 'ดูรถและราคา',
    'hero.cta_line': 'ติดต่อผ่าน LINE',
    'form.title': 'เช็กคิวรถและขอราคาฟรี',
    'form.subtitle': 'กรอกข้อมูลสั้นๆ เจ้าหน้าที่จะสรุปราคาและแจ้งคิวรถภายใน 5 นาที',
    'form.travel_date': 'วันที่เดินทาง',
    'form.travel_time': 'เวลาเดินทาง',
    'form.pickup': 'จุดรับ (เช่น สนามบิน / โรงแรมในเมือง)',
    'form.destination': 'จุดหมายปลายทาง / เส้นทางที่ต้องการไป',
    'form.trip_type': 'รูปแบบการเดินทาง',
    'form.passengers': 'จำนวนผู้โดยสาร (คน)',
    'form.luggage': 'จำนวนกระเป๋า (ใบ)',
    'form.vehicle_type': 'ประเภทรถที่สนใจ',
    'form.name': 'ชื่อผู้ติดต่อ',
    'form.phone': 'เบอร์โทรศัพท์',
    'form.line_id': 'LINE ID (ถ้ามี)',
    'form.note': 'หมายเหตุเพิ่มเติม (เช่น ต้องการคาร์ซีต / มีผู้สูงอายุ)',
    'form.submit': 'ส่งข้อมูลเช็กคิวและรับราคา',
    'form.success_title': 'ส่งข้อมูลเช็กคิวสำเร็จเรียบร้อยแล้ว!',
    'form.success_msg': 'หมายเลขคำขอของคุณคือ',
    'form.open_line': 'กดเปิด LINE เพื่อส่งข้อความยืนยันคิว',
    'services.title': 'บริการยอดนิยม MR Car Rent Chiang Mai',
    'vehicles.title': 'รถและราคาค่าเช่าพร้อมคนขับ',
    'packages.title': 'แพ็กเกจท่องเที่ยวยอดนิยมในเชียงใหม่และต่างจังหวัด',
    'why.title': 'ทำไมลูกค้าจึงมั่นใจเลือก MR Car Rent Chiang Mai',
    'steps.title': '4 ขั้นตอนการจองง่ายๆ ไม่ซับซ้อน',
    'reviews.title': 'รีวิวและความประทับใจจากลูกค้าจริง',
    'faq.title': 'คำถามที่พบบ่อย (FAQ)',
    'footer.about': 'บริการรถเช่าพร้อมคนขับในจังหวัดเชียงใหม่และภาคเหนือ ปลอดภัย ตรงต่อเวลา คนขับชำนาญเส้นทาง บริการเป็นกันเอง',
    'mobile.call': 'โทรสอบถาม',
    'mobile.line': 'แชต LINE',
    'mobile.quote': 'เช็กคิวรถ',
  },
  en: {
    'nav.home': 'Home',
    'nav.vehicles': 'Vehicles & Rates',
    'nav.packages': 'Tour Packages',
    'nav.airport': 'Airport Transfer',
    'nav.reviews': 'Reviews',
    'nav.faq': 'FAQ',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.btn_quote': 'Check Availability & Quote',
    'hero.badge': 'Private Driver Service in Chiang Mai - Reliable, Safe & Professional',
    'hero.title': 'Chiang Mai Car Rental with Driver - Relaxing, Safe & Clear Pricing',
    'hero.subtitle': 'Sedan, SUV & VIP Van with experienced drivers for airport transfers, sightseeing day tours, and upcountry trips.',
    'hero.price_start': 'Starting from 1,200 THB/day',
    'hero.cta_quote': 'Check Availability & Get Quote',
    'hero.cta_vehicles': 'View Fleet & Rates',
    'hero.cta_line': 'Contact via LINE',
    'form.title': 'Check Vehicle Availability & Instant Free Quote',
    'form.subtitle': 'Fill in short details. Our team will verify schedule and send you a clear quote within 5 mins.',
    'form.travel_date': 'Travel Date',
    'form.travel_time': 'Travel Time',
    'form.pickup': 'Pickup Location (e.g., CNX Airport / Hotel)',
    'form.destination': 'Destination / Planned Route',
    'form.trip_type': 'Trip Type',
    'form.passengers': 'Passengers (Persons)',
    'form.luggage': 'Luggage Count (Bags)',
    'form.vehicle_type': 'Preferred Vehicle Type',
    'form.name': 'Contact Name',
    'form.phone': 'Phone Number',
    'form.line_id': 'LINE ID / WhatsApp (Optional)',
    'form.note': 'Special Requests (e.g., Child Seat / Elderly Passengers)',
    'form.submit': 'Send Request & Get Quote',
    'form.success_title': 'Quote Request Submitted Successfully!',
    'form.success_msg': 'Your Reference Code is',
    'form.open_line': 'Open LINE App with Pre-filled Message',
    'services.title': 'Popular Private Chauffeur Services',
    'vehicles.title': 'Vehicle Fleet & Daily Rental Rates',
    'packages.title': 'Top Rated Day Tours in Chiang Mai & Northern Thailand',
    'why.title': 'Why Travelers Trust MR Car Rent Chiang Mai',
    'steps.title': 'Simple 4-Step Booking Process',
    'reviews.title': 'Real Feedback from Satisfied Customers',
    'faq.title': 'Frequently Asked Questions (FAQ)',
    'footer.about': 'Premier private car rental with driver service in Chiang Mai and Northern Thailand. Punctual, safe, local expert drivers with friendly care.',
    'mobile.call': 'Call Us',
    'mobile.line': 'Chat LINE',
    'mobile.quote': 'Check Availability',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('th');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/en' || path.startsWith('/en/')) {
      setLanguageState('en');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en' || urlLang === 'th') {
      setLanguageState(urlLang as Language);
      return;
    }

    const savedLang = localStorage.getItem('app_lang');
    if (savedLang === 'en' || savedLang === 'th') {
      setLanguageState(savedLang as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.toString());
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['th'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
