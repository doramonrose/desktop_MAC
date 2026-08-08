import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, HeartHandshake, MapPin, Sparkles, Clock, MessageCircle, Globe, Car, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { language, t } = useLanguage();

  const reasons = [
    {
      icon: MapPin,
      title_th: 'คนขับชำนาญเส้นทางภูเขา',
      title_en: 'Experienced Mountain Drivers',
      desc_th: 'ชำนาญโค้งดอยอินทนนท์ แม่กำปอง ม่อนแจ่ม ปาย และเชียงราย ขับรถนุ่มนวล ปลอดภัย ไม่เมารถ',
      desc_en: 'Navigating steep mountain curves to Doi Inthanon, Mae Kampong, Mon Jam & Pai safely.'
    },
    {
      icon: Sparkles,
      title_th: 'รถสะอาด ตรวจสภาพสม่ำเสมอ',
      title_en: 'Sanitized & Fully Inspected Fleet',
      desc_th: 'ทำความสะอาดดูดฝุ่นฆ่าเชื้อก่อนส่งมอบทุกครั้ง แอร์เย็นฉ่ำ สภาพรถใหม่ ไม่มีกลิ่นอับ',
      desc_en: 'Deep cleaned, sanitized, fresh interior with powerful air conditioning.'
    },
    {
      icon: ShieldCheck,
      title_th: 'ราคาโปร่งใส ชัดเจน',
      title_en: 'Transparent Fair Rates',
      desc_th: 'ราคาสุทธิเสนอคำนวณตามจริง ไม่มีค่าธรรมเนียมแอบแฝงจิปาถะหน้างาน',
      desc_en: 'No hidden fees or unexpected charges. Complete peace of mind.'
    },
    {
      icon: HeartHandshake,
      title_th: 'ปรับเปลี่ยนเส้นทางได้ตามใจ',
      title_en: '100% Flexible Itinerary',
      desc_th: 'ยืดหยุ่นปรับแวะจุดถ่ายรูป คาเฟ่ ร้านอาหาร หรือสถานที่อยากไประหว่างทางได้ตลอดทริป',
      desc_en: 'Customize cafe stops and photo spots flexibly on the go.'
    },
    {
      icon: MessageCircle,
      title_th: 'ติดต่อสะดวกรวดเร็วผ่าน LINE',
      title_en: 'Fast Response via LINE Chat',
      desc_th: 'ตอบไว สรุปคิวรถและราคาได้ภายใน 5 นาที พร้อมดูแลและประสานงานตลอดทริป',
      desc_en: 'Prompt responses within 5 minutes with dedicated trip coordination support.'
    },
    {
      icon: Globe,
      title_th: 'รองรับนักท่องเที่ยวต่างชาติ',
      title_en: 'English Communicative Drivers',
      desc_th: 'คนขับสื่อสารภาษาอังกฤษพื้นฐานได้ บริการเป็นกันเอง ประทับใจลูกค้าต่างชาติ',
      desc_en: 'Welcoming international tourists with English communicative chauffeurs.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            {language === 'th' ? 'จุดเด่นของเรา' : 'Why Choose Us'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            {t('why.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {language === 'th'
              ? 'มุ่งมั่นให้บริการด้วยมาตรฐานความปลอดภัย ความตรงต่อเวลา และมิตรภาพที่ประทับใจ'
              : 'Committed to high safety standards, punctuality, and friendly service.'}
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-amber-400 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {language === 'th' ? item.title_th : item.title_en}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {language === 'th' ? item.desc_th : item.desc_en}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
