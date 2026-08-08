import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, HeartPulse, ShieldAlert, Award, FileText, Lock, Sparkles, Check } from 'lucide-react';

export const TrustSafetySection: React.FC = () => {
  const { language } = useLanguage();

  const trustItems = [
    {
      title_th: 'การตรวจเช็กสภาพรถยนต์',
      title_en: 'Strict Vehicle Safety Inspection',
      desc_th: 'ตรวจเช็กระบบเบรก ยางเครื่องยนต์ น้ำมันเครื่อง และระบบปรับอากาศก่อนออกเดินทางทุกทริป',
      desc_en: 'Regular brake, tire, engine, and aircon checks before every single trip.'
    },
    {
      title_th: 'ประกันภัยอุบัติเหตุผู้โดยสาร',
      title_en: 'Comprehensive Passenger Insurance',
      desc_th: 'รถทุกคันมีประกันภัย พ.ร.บ. และประกันภัยประเภท 1 คุ้มครองผู้โดยสารตลอดระยะเวลาเดินทาง',
      desc_en: 'All vehicles carry first-class commercial passenger accident insurance coverage.'
    },
    {
      title_th: 'มาตรฐานความสะอาดและอนามัย',
      title_en: 'Hygiene & Cleanliness Standards',
      desc_th: 'ทำความสะอาดดูดฝุ่น พ่นน้ำยาฆ่าเชื้อ และเตรียมน้ำดื่มบรรจุขวดฟรีประจำทุกที่นั่ง',
      desc_en: 'Vacuumed, sanitized interiors with free bottled mineral water per seat.'
    },
    {
      title_th: 'นโยบายการยกเลิกและการเปลี่ยนวัน',
      title_en: 'Flexible Cancellation & Rescheduling',
      desc_th: 'แจ้งเลื่อนวันเดินทางล่วงหน้าอย่างน้อย 3 วัน ฟรีไม่มีค่าธรรมเนียม บริการด้วยความเข้าใจ',
      desc_en: 'Free date rescheduling when notified at least 3 days in advance.'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                {language === 'th' ? 'ความปลอดภัยและอุ่นใจ' : 'Trust & Safety Standard'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {language === 'th' ? 'มาตรฐานความปลอดภัยที่คุณมั่นใจได้ 100%' : '100% Guaranteed Travel Safety & Peace of Mind'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {language === 'th'
                  ? 'MR Car Rent Chiang Mai ให้ความสำคัญกับความปลอดภัย ความสะอาด และความสุขของลูกค้าระหว่างเดินทางเสมอ'
                  : 'Prioritizing passenger safety, vehicle hygiene, and delightful travel experiences.'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-400">
                <ShieldCheck className="w-5 h-5" />
                <span>{language === 'th' ? 'คนขับมีใบขับขี่สาธารณะและประสบการณ์ขับรถภูเขาสูง' : 'Licensed Drivers with High Mountain Driving Expertise'}</span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustItems.map((item, idx) => (
                <div key={idx} className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm mb-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    <h4>{language === 'th' ? item.title_th : item.title_en}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'th' ? item.desc_th : item.desc_en}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
