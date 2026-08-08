import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { Calendar, Send, CheckCircle2, Car, ChevronRight } from 'lucide-react';

export const BookingSteps: React.FC = () => {
  const { language, t } = useLanguage();
  const { openQuoteModal } = useQuoteModal();

  const steps = [
    {
      num: '01',
      icon: Calendar,
      title_th: '1. เลือกวันและเส้นทาง',
      title_en: '1. Choose Date & Route',
      desc_th: 'เลือกวันที่ต้องการเดินทาง สถานที่เที่ยว หรือเลือกประเภทรถที่เหมาะสม',
      desc_en: 'Select your travel dates, preferred sightseeing routes or vehicle model.'
    },
    {
      num: '02',
      icon: Send,
      title_th: '2. ส่งข้อมูลเช็กคิว',
      title_en: '2. Check Availability',
      desc_th: 'กรอกแบบฟอร์มสั้นๆ เพื่อเช็กคิวรถว่างและรับราคาประมาณการฟรีทันที',
      desc_en: 'Fill in quick form details to check car availability & receive instant rate.'
    },
    {
      num: '03',
      icon: CheckCircle2,
      title_th: '3. รับราคาและยืนยันการจอง',
      title_en: '3. Confirm Booking',
      desc_th: 'เจ้าหน้าที่สรุปราคาทาง LINE ชำระมัดจำ 500 บาท เพื่อล็อคคิวรถ',
      desc_en: 'Confirm schedule via LINE and lock vehicle with a 500 THB deposit.'
    },
    {
      num: '04',
      icon: Car,
      title_th: '4. คนขับไปรับตามนัดหมาย',
      title_en: '4. Enjoy Your Ride',
      desc_th: 'คนขับสุภาพรอรับตรงเวลา ออกเดินทางท่องเที่ยวอย่างผ่อนคลาย',
      desc_en: 'Your polite driver picks you up punctually at hotel or airport.'
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            {language === 'th' ? 'ขั้นตอนการจอง' : 'How to Book'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">
            {t('steps.title')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            {language === 'th'
              ? 'ไม่จำเป็นต้องชำระเงินทันทีในขั้นตอนเช็กคิว สะดวก รวดเร็ว การันตีรถแน่นอน'
              : 'Easy 4 steps without instant payment pressure during quote check.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => {
            const IconComp = st.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 relative flex flex-col justify-between hover:border-amber-500/60 transition-all group"
              >
                <div className="absolute top-4 right-4 text-3xl font-black text-slate-700/50 group-hover:text-amber-500/20 transition-colors">
                  {st.num}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center mb-4 shadow-md">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white">
                    {language === 'th' ? st.title_th : st.title_en}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {language === 'th' ? st.desc_th : st.desc_en}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-700/60 text-[11px] font-bold text-amber-400 flex items-center gap-1">
                  <span>{language === 'th' ? 'ขั้นตอนที่' : 'Step'} {idx + 1}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => openQuoteModal()}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-base shadow-xl inline-flex items-center gap-2 active:scale-95"
          >
            <span>{language === 'th' ? 'เช็กคิวรถและขอราคาตอนนี้' : 'Check Availability Now'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
