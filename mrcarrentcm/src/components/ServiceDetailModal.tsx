import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { TourPackage } from '../types';
import { X, MapPin, Clock, Users, Check, XCircle, ChevronRight, Car, Sparkles, ShieldCheck } from 'lucide-react';

interface ServiceDetailModalProps {
  slug: string | null;
  packages: TourPackage[];
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ slug, packages, onClose }) => {
  const { language } = useLanguage();
  const { openQuoteModal } = useQuoteModal();

  if (!slug) return null;

  const pkg = packages.find(p => p.slug === slug);

  // Fallback if it's a generic service slug rather than a package
  const title = pkg ? (language === 'th' ? pkg.title_th : pkg.title_en) : (language === 'th' ? 'รายละเอียดบริการรถเช่าพร้อมคนขับ' : 'Chauffeur Service Details');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 bg-slate-950 overflow-hidden">
          <img
            src={pkg ? pkg.image : '/images/hero_chiangmai_car.jpg?v=fixed_20260808'}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero_chiangmai_car.jpg?v=fixed_20260808';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider mb-2 inline-block shadow-md">
              {pkg ? (language === 'th' ? pkg.duration_th : pkg.duration_en) : (language === 'th' ? 'บริการยอดนิยม' : 'Popular Service')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {pkg ? (
            <>
              {/* Duration & Capacity */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{language === 'th' ? pkg.duration_th : pkg.duration_en}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>{language === 'th' ? pkg.capacity_th : pkg.capacity_en}</span>
                </div>
                <span>•</span>
                <div className="text-amber-800 font-extrabold text-sm">
                  {language === 'th' ? `เริ่มต้น ${pkg.price_start.toLocaleString()} ฿` : `From ${pkg.price_start.toLocaleString()} THB`}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-2">
                  {language === 'th' ? 'รายละเอียดเส้นทางและจุดแวะท่องเที่ยว' : 'Tour Itinerary & Sightseeing Highlights'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {language === 'th' ? pkg.description_th : pkg.description_en}
                </p>
              </div>

              {/* Key Spots */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{language === 'th' ? 'จุดแวะไฮไลต์ของทริปนี้' : 'Trip Key Highlights'}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(language === 'th' ? pkg.key_spots_th : pkg.key_spots_en).map((spot, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <span>{spot}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200">
                  <h4 className="text-xs font-black uppercase text-emerald-900 mb-2 flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'th' ? 'ราคานี้รวมแล้ว:' : 'Inclusions:'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-800">
                    {(language === 'th' ? pkg.includes_th : pkg.includes_en).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-black uppercase text-slate-700 mb-2 flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-slate-400" />
                    <span>{language === 'th' ? 'ราคานี้ยังไม่รวม:' : 'Exclusions:'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(language === 'th' ? pkg.excludes_th : pkg.excludes_en).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="text-sm text-slate-600 leading-relaxed space-y-4">
              <p>
                {language === 'th'
                  ? 'บริการรถเช่าพร้อมคนขับเชียงใหม่ของ MR Car Rent Chiang Mai บริการด้วยรถเก๋ง SUV และรถตู้ VIP คนขับชำนาญทางภูเขาสูง ตรงเวลา สะอาด ปลอดภัย ยืดหยุ่นปรับเปลี่ยนแผนได้ตลอดทาง'
                  : 'Complete private chauffeur and tour packages covering Chiang Mai and Northern Thailand.'}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'th' ? 'ไม่เสียค่าใช้จ่ายในขั้นตอนเช็กคิว' : 'Free availability check'}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              openQuoteModal({ destination: pkg ? pkg.title_th : '' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <Car className="w-4 h-4" />
            <span>{language === 'th' ? 'เช็กคิวและขอราคาโปรแกรมนี้' : 'Check Queue for This Trip'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
