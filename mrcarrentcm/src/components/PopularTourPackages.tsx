import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { TourPackage } from '../types';
import { MapPin, Clock, Users, ChevronRight, Sparkles } from 'lucide-react';

interface PopularTourPackagesProps {
  packages: TourPackage[];
  onSelectPackageSlug: (slug: string) => void;
}

export const PopularTourPackages: React.FC<PopularTourPackagesProps> = ({ packages, onSelectPackageSlug }) => {
  const { language, t } = useLanguage();
  const { openQuoteModal } = useQuoteModal();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label_th: 'ทั้งหมด', label_en: 'All Packages' },
    { id: 'full_day', label_th: 'เที่ยว 1 วัน', label_en: 'Full Day' },
    { id: 'half_day', label_th: 'เที่ยวครึ่งวัน', label_en: 'Half Day' },
    { id: 'culture', label_th: 'ไหว้พระ/สายมู', label_en: 'Temples & Culture' },
    { id: 'nature', label_th: 'ธรรมชาติ/ภูเขา', label_en: 'Nature & Hills' },
    { id: 'upcountry', label_th: 'ต่างจังหวัด', label_en: 'Inter-Province' },
    { id: 'multi_day', label_th: 'เที่ยวหลายวัน', label_en: 'Multi Day' },
  ];

  const filteredPackages = packages.filter(pkg => {
    if (activeFilter === 'all') return true;
    return pkg.category === activeFilter;
  });

  return (
    <section id="packages" className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'แพ็กเกจท่องเที่ยวยอดนิยม' : 'Tour Packages'}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">
            {language === 'th' ? 'แพ็กเกจท่องเที่ยวยอดนิยมในเชียงใหม่และต่างจังหวัด' : 'Popular Tour Packages in Chiang Mai & Beyond'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            {language === 'th'
              ? 'จัดทริปเที่ยวเชียงใหม่ ม่อนแจ่ม ดอยอินทนนท์ แม่กำปอง หรือเชียงราย ปาย สบายใจด้วยรถสภาพใหม่พร้อมคนขับชำนาญทาง'
              : 'Explore Chiang Mai and nearby provinces with private comfortable vehicles and local experienced drivers.'}
          </p>
        </div>

        {/* Filter Buttons Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {filterOptions.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-amber-400 text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {language === 'th' ? filter.label_th : filter.label_en}
            </button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map(pkg => (
            <div
              key={pkg.id}
              className="bg-slate-800/90 rounded-2xl border border-slate-700 overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img
                  src={pkg.image}
                  alt={pkg.title_th}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/doi_inthanon.jpg?v=fixed_20260808';
                  }}
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {pkg.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-950/80 backdrop-blur-md text-amber-400 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-amber-500/30">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 text-sm font-black px-3 py-1 rounded-lg shadow-md">
                  {language === 'th' ? `เริ่ม ${pkg.price_start.toLocaleString()} ฿` : `From ${pkg.price_start.toLocaleString()} THB`}
                </div>
              </div>

              {/* Package Details Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {language === 'th' ? pkg.title_th : pkg.title_en}
                  </h3>

                  {/* Duration & Capacity */}
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-300 mt-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === 'th' ? pkg.duration_th : pkg.duration_en}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === 'th' ? pkg.capacity_th : pkg.capacity_en}</span>
                    </div>
                  </div>

                  {/* Key Spots */}
                  <div className="mt-3.5">
                    <h4 className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{language === 'th' ? 'จุดแวะหลัก:' : 'Key Sightseeing Spots:'}</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {(language === 'th' ? pkg.key_spots_th : pkg.key_spots_en).slice(0, 4).map((spot, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{spot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Included / Excluded Tags */}
                  <div className="mt-3 pt-3 border-t border-slate-700/80 text-[11px] space-y-1">
                    <div className="text-emerald-400 font-medium">
                      ✓ {language === 'th' ? 'รวม:' : 'Includes:'} {(language === 'th' ? pkg.includes_th : pkg.includes_en).join(', ')}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => onSelectPackageSlug(pkg.slug)}
                    className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors text-center cursor-pointer"
                  >
                    {language === 'th' ? 'ดูโปรแกรม' : 'Itinerary'}
                  </button>

                  <button
                    onClick={() => openQuoteModal({ package_id: pkg.id, destination: pkg.title_th })}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'th' ? 'เช็กคิวทริปนี้' : 'Check Queue'}</span>
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
