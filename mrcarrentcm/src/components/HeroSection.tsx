import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { ShieldCheck, CheckCircle2, MessageCircle, ChevronRight, Star, Clock, Car, Award, Calendar, MapPin } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroSectionProps {
  settings: SiteSettings;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings, onNavigate }) => {
  const { language, t } = useLanguage();
  const { openQuoteModal } = useQuoteModal();
  const isTh = language === 'th';

  const trustBadges = [
    {
      title_th: 'คนขับชำนาญเส้นทาง',
      title_en: 'Experienced Local Driver',
      desc_th: 'ชำนาญทางภูเขา โค้งดอย',
      desc_en: 'Expert in Steep Mountain Roads'
    },
    {
      title_th: 'รถสะอาด ตรวจสภาพดี',
      title_en: 'Clean & Well Maintained',
      desc_th: 'ทำความสะอาดเช็กระบบก่อนส่ง',
      desc_en: 'Sanitized & Safety Inspected'
    },
    {
      title_th: 'ราคาโปร่งใส ชัดเจน',
      title_en: 'Transparent Fair Pricing',
      desc_th: 'ไม่มีบวกเพิ่มซ่อนเร้น',
      desc_en: 'No Hidden Surprise Fees'
    },
    {
      title_th: 'บริการเป็นกันเอง',
      title_en: 'Friendly Hospitality',
      desc_th: 'ดูแลดุจญาติมิตรตลอดทริป',
      desc_en: 'Attentive Friendly Care'
    }
  ];

  return (
    <section id="hero" className="relative pt-24 pb-16 lg:pt-28 lg:pb-24 bg-slate-950 overflow-hidden text-white">
      {/* Background Image Layer with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_chiangmai_car.jpg?v=fixed_20260808"
          alt="รถเช่าพร้อมคนขับเชียงใหม่ MR Car Rent"
          width={1376}
          height={768}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transform filter blur-[1px]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/hero_chiangmai_car.jpg?v=fixed_20260808';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isTh ? 'อันดับ 1 บริการรถเช่าพร้อมคนขับเชียงใหม่' : '#1 Rated Private Driver in Chiang Mai'}</span>
            </div>

            {/* Main Title - H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight sm:leading-tight">
              {isTh ? (
                <>
                  รถเช่าพร้อมคนขับเชียงใหม่ <br className="hidden sm:inline" />
                  <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                    เที่ยวสบาย เป็นส่วนตัว ราคาชัดเจน
                  </span>
                </>
              ) : (
                <>
                  Chiang Mai Car Rental with Driver <br />
                  <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                    Relaxing, Private & Transparent Pricing
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {isTh 
                ? 'บริการรถเก๋ง SUV และรถตู้ VIP พร้อมพนักงานขับรถมืออาชีพ รับส่งสนามบินเชียงใหม่ เหมารถเที่ยวแม่กำปอง ม่อนแจ่ม อินทนนท์ เชียงราย ปาย จองง่าย เช็กคิวและขอราคาผ่าน LINE ได้ทันที'
                : 'Rent a sedan, SUV or VIP van with an experienced local driver. Airport transfer & sightseeing day tours in Chiang Mai.'}
            </p>

            {/* Key Value Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">{isTh ? 'รถเก๋งเริ่มต้น' : 'Sedan Rates'}</p>
                  <p className="text-sm font-bold text-white">฿1,200<span className="text-[10px] text-slate-400 font-normal">/{isTh ? 'วัน' : 'day'}</span></p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">{isTh ? 'รับส่งสนามบิน' : 'Airport Transfer'}</p>
                  <p className="text-sm font-bold text-white">฿350<span className="text-[10px] text-slate-400 font-normal">/{isTh ? 'เที่ยว' : 'trip'}</span></p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">{isTh ? 'การประเมินลูกค้า' : 'Rating'}</p>
                  <p className="text-sm font-bold text-white">5.0 / 5.0 <span className="text-[10px] text-slate-400 font-normal">(180+)</span></p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>{isTh ? 'เช็กคิวรถและขอราคา' : 'Check Availability & Quote'}</span>
              </button>

              <a
                href={settings.line_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{isTh ? 'สอบถามทาง LINE' : 'Contact on LINE'}</span>
              </a>
            </div>

          </div>

          {/* Right Pricing Summary Box with H2 */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
              <div className="border-b border-slate-800 pb-4 mb-4">
                <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>{isTh ? 'รถเช่าพร้อมคนขับเชียงใหม่ ราคาเท่าไหร่' : 'Chiang Mai Rental Rates Summary'}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {isTh ? 'ราคามาตรฐาน ชัดเจน รวมคนขับสุภาพ ไม่ต้องจ่ายจุกจิก' : 'Standard clear rates with professional driver included'}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-white">{isTh ? 'รถเก๋ง All-New (1-4 ท่าน)' : 'Sedan (1-4 Pax)'}</div>
                    <div className="text-[11px] text-slate-400">Yaris Ativ / Altis</div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-400 font-extrabold text-base">฿1,200</div>
                    <div className="text-[10px] text-slate-500">/{isTh ? 'วัน' : 'day'}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-white">{isTh ? 'รถ SUV 7 ที่นั่ง (1-6 ท่าน)' : 'SUV (1-6 Pax)'}</div>
                    <div className="text-[11px] text-slate-400">Toyota Fortuner Leader</div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-400 font-extrabold text-base">฿1,800</div>
                    <div className="text-[10px] text-slate-500">/{isTh ? 'วัน' : 'day'}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-white">{isTh ? 'รถตู้ VIP 10 ที่นั่ง (1-10 ท่าน)' : 'VIP Van 10-Seater (1-10 Pax)'}</div>
                    <div className="text-[11px] text-slate-400">Toyota Commuter VIP</div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-400 font-extrabold text-base">฿2,200</div>
                    <div className="text-[10px] text-slate-500">/{isTh ? 'วัน' : 'day'}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openQuoteModal()}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>{isTh ? 'ขอใบเสนอราคาประเมินค่าเดินทาง' : 'Get Custom Quote'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-white">{isTh ? badge.title_th : badge.title_en}</h3>
                <p className="text-[11px] text-slate-400">{isTh ? badge.desc_th : badge.desc_en}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
