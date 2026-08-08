import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { Vehicle } from '../types';
import { Users, Briefcase, Check, ShieldCheck, Sparkles, ChevronRight, Car } from 'lucide-react';

interface VehicleSectionProps {
  vehicles: Vehicle[];
}

export const VehicleSection: React.FC<VehicleSectionProps> = ({ vehicles }) => {
  const { language, t } = useLanguage();
  const { openQuoteModal } = useQuoteModal();

  return (
    <section id="vehicles" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            {language === 'th' ? 'ประเภทยานพาหนะ' : 'Vehicle Fleet'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            {t('vehicles.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {language === 'th'
              ? 'รถสะอาด สภาพใหม่ ตรวจเช็กระบบสม่ำเสมอ พร้อมคนขับมืออาชีพชำนาญเส้นทาง'
              : 'Clean, safe, fully inspected vehicles with expert professional drivers.'}
          </p>
        </div>

        {/* Vehicles Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {vehicles.map(v => (
            <div
              key={v.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={v.image}
                  alt={v.name_th}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/sedan_vios_chiangmai.jpg?v=fixed_20260808';
                  }}
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-md shadow-md uppercase">
                  {v.type}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/90 text-amber-400 text-sm font-extrabold px-3 py-1.5 rounded-lg border border-slate-800">
                  {language === 'th' ? `เริ่ม ${v.price_start.toLocaleString()} ฿ / วัน` : `From ${v.price_start.toLocaleString()} THB / day`}
                </div>
              </div>

              {/* Vehicle Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {language === 'th' ? v.name_th : v.name_en}
                  </h3>

                  {/* Capacities */}
                  <div className="flex items-center gap-4 mt-3 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span>{v.capacity_passengers}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-amber-600" />
                      <span>{v.capacity_luggage}</span>
                    </div>
                  </div>

                  {/* Description & Suitable For */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {language === 'th' ? v.description_th : v.description_en}
                  </p>

                  <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 font-semibold">
                    <span className="font-extrabold text-amber-800 block mb-0.5">
                      {language === 'th' ? 'เหมาะสำหรับ:' : 'Suitable for:'}
                    </span>
                    {language === 'th' ? v.suitable_for_th : v.suitable_for_en}
                  </div>

                  {/* Amenities List */}
                  <div className="mt-4">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                      {language === 'th' ? 'สิ่งอำนวยความสะดวกในรถ:' : 'In-Car Amenities:'}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {(language === 'th' ? v.amenities_th : v.amenities_en).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Includes in Price */}
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                      {language === 'th' ? 'ราคานี้รวม:' : 'Included in Rate:'}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(language === 'th' ? v.includes_th : v.includes_en).map((inc, idx) => (
                        <span key={idx} className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2 py-0.5 rounded border border-emerald-200">
                          ✓ {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal({ vehicle_type: v.type, vehicle_id: v.id })}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Car className="w-4 h-4" />
                    <span>{language === 'th' ? `เช็กคิวรถ${v.name_th.split(' ')[0]}` : `Check Queue (${v.type.toUpperCase()})`}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
