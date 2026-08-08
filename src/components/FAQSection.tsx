import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FAQItem } from '../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const { language, t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            {language === 'th' ? 'ไขข้อข้องใจ' : 'Got Questions?'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            {t('faq.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {language === 'th'
              ? 'รวบรวมคำถามและคำตอบที่พบบ่อยเกี่ยวกับการเช่ารถพร้อมคนขับเชียงใหม่'
              : 'Answers to popular questions regarding private chauffeur rentals.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map(item => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-white border-amber-400 shadow-md' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-base focus:outline-none"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{language === 'th' ? item.question_th : item.question_en}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {language === 'th' ? item.answer_th : item.answer_en}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
