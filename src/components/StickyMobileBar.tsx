import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { MessageCircle, Phone, Car, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';

interface StickyMobileBarProps {
  settings: SiteSettings;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ settings }) => {
  const { language } = useLanguage();
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-2.5 shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        
        {/* Quote Modal Trigger */}
        <button
          id="mobile-sticky-quote-btn"
          onClick={() => openQuoteModal()}
          className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 active:scale-95 text-slate-950 font-black text-xs flex flex-col items-center justify-center gap-1 shadow-md"
        >
          <Car className="w-4 h-4" />
          <span>{language === 'th' ? 'เช็กคิว / ขอราคา' : 'Get Quote'}</span>
        </button>

        {/* LINE Chat */}
        <a
          id="mobile-sticky-line-btn"
          href={settings.line_url}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex flex-col items-center justify-center gap-1 shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{language === 'th' ? 'แชต LINE' : 'LINE Chat'}</span>
        </a>

        {/* Call Hotline */}
        <a
          id="mobile-sticky-phone-btn"
          href={`tel:${settings.phone.replace(/-/g, '')}`}
          className="py-2.5 px-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-extrabold text-xs flex flex-col items-center justify-center gap-1"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>{language === 'th' ? 'โทรด่วน' : 'Call Hotline'}</span>
        </a>

      </div>
    </div>
  );
};
