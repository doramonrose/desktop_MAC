import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { MessageCircle, Phone, Car, ChevronRight, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';
import { LineQrBlock } from './LineQrBlock';

interface CallToActionSectionProps {
  settings: SiteSettings;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({ settings }) => {
  const { language } = useLanguage();
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{language === 'th' ? 'พร้อมให้บริการ 24 ชั่วโมง' : '24/7 Advance Booking'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {language === 'th' ? 'กำลังวางแผนเที่ยวเชียงใหม่อยู่หรือไม่?' : 'Planning Your Chiang Mai Trip?'}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            {language === 'th'
              ? 'ส่งวันเดินทาง จำนวนผู้โดยสาร และสถานที่ที่ต้องการไป เจ้าหน้าที่จะช่วยแนะนำรถและแพ็กเกจที่เหมาะสม พร้อมเช็กคิวและสรุปราคาให้ฟรีทันที!'
              : 'Send us your travel dates, passenger count & destinations. Our team will recommend suitable cars and instant clear rates!'}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              id="cta-bottom-quote-btn"
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-base shadow-xl flex items-center justify-center gap-2 active:scale-95"
            >
              <Car className="w-5 h-5" />
              <span>{language === 'th' ? 'เช็กคิวรถและขอราคาฟรี' : 'Check Availability & Get Quote'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <a
              id="cta-bottom-line-btn"
              href={settings.line_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>LINE: {settings.line_id}</span>
            </a>

            <a
              id="cta-bottom-phone-btn"
              href={`tel:${settings.phone.replace(/-/g, '')}`}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base border border-slate-700 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              <span>{settings.phone}</span>
            </a>
          </div>

          <div className="flex justify-center">
            <LineQrBlock settings={settings} language={language} size="md" variant="dark" />
          </div>
        </div>

      </div>
    </section>
  );
};
