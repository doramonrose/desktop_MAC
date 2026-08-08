import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { Users, ChevronRight, CheckCircle, Car, ShieldCheck, MapPin } from 'lucide-react';

interface PopularServicesProps {
  onSelectServiceSlug: (slug: string) => void;
}

export const PopularServices: React.FC<PopularServicesProps> = ({ onSelectServiceSlug }) => {
  const { language, t } = useLanguage();
  const { openQuoteModal } = useQuoteModal();

  const services = [
    {
      id: 'srv-1',
      slug: 'car-with-driver-chiang-mai',
      title_th: 'รถเช่าพร้อมคนขับเชียงใหม่',
      title_en: 'Private Car Rental with Driver',
      desc_th: 'บริการเหมารถเก๋ง SUV และรถตู้ เที่ยวในเมืองและรอบจังหวัดเชียงใหม่ คนขับสุภาพ รู้จักทางเป็นอย่างดี',
      desc_en: 'Full day private chauffeur service around Chiang Mai. Custom itinerary with courteous local drivers.',
      image: '/images/hero_chiangmai_car.jpg?v=fixed_20260808',
      price: '1,200',
      passengers: '1-10 ท่าน',
      badge_th: 'ยอดนิยมสูงสุด',
      badge_en: 'Most Popular'
    },
    {
      id: 'srv-2',
      slug: 'chiang-mai-airport-transfer',
      title_th: 'รถรับส่งสนามบินเชียงใหม่',
      title_en: 'Chiang Mai Airport Private Transfer',
      desc_th: 'บริการรับส่งสนามบิน (CNX) ตรงเวลา คนขับรอรับ ไม่ต้องต่อคิวแท็กซี่ ส่งถึงหน้าโรงแรม',
      desc_en: 'Hassle-free Airport (CNX) transfer. Name board pickup directly to your hotel or resort.',
      image: '/images/sedan_vios_chiangmai.jpg?v=fixed_20260808',
      price: '350',
      passengers: '1-10 ท่าน',
      badge_th: 'ตรงเวลา 100%',
      badge_en: '100% Punctual'
    },
    {
      id: 'srv-3',
      slug: 'chiang-mai-van-rental',
      title_th: 'รถตู้พร้อมคนขับ VIP 10 ที่นั่ง',
      title_en: 'VIP 10-Seater Van with Driver',
      desc_th: 'รถตู้หรูหรา เบาะนวด ปรับนอนกว้าง ทีวี ยูเอสบี เหมาะสำหรับกลุ่มครอบครัว สัมมนา และคณะใหญ่',
      desc_en: 'Luxurious VIP Commuter Van with reclining seats, TV, USB chargers for group comfort.',
      image: '/images/vip_van_2026.jpg?v=fixed_20260808',
      price: '2,200',
      passengers: '1-10 ท่าน',
      badge_th: 'เบาะ VIP กว้าง',
      badge_en: 'Spacious VIP Seats'
    },
    {
      id: 'srv-4',
      slug: 'chiang-mai-day-trip',
      title_th: 'เที่ยวเชียงใหม่ 1 วัน',
      title_en: 'Chiang Mai 1-Day Private Tour',
      desc_th: 'แพ็กเกจเหมารถเที่ยวสถานที่ยอดฮิต เช่น ดอยอินทนนท์ แม่กำปอง ม่อนแจ่ม ดอยสุเทพ ครบในวันเดียว',
      desc_en: 'Popular 1-day sightseeing trips to Doi Inthanon, Mae Kampong, Mon Jam & Doi Suthep.',
      image: '/images/doi_inthanon.jpg?v=fixed_20260808',
      price: '1,800',
      passengers: '1-10 ท่าน',
      badge_th: 'จัดเส้นทางได้',
      badge_en: 'Customizable'
    },
    {
      id: 'srv-5',
      slug: 'chiang-mai-to-chiang-rai',
      title_th: 'รถเชียงใหม่ไปเชียงราย (ไป-กลับ)',
      title_en: 'Chiang Mai to Chiang Rai Day Trip',
      desc_th: 'เหมารถเที่ยววัดร่องขุ่น วัดร่องเสือเต้น บ้านดำ วัดห้วยปลากั้ง ไปกลับวันเดียว นั่งสบายตลอดทาง',
      desc_en: 'Day trip to White Temple, Blue Temple, and Black House in Chiang Rai in comfort.',
      image: '/images/chiang_rai.jpg?v=fixed_20260808',
      price: '3,200',
      passengers: '1-10 ท่าน',
      badge_th: 'เดินทางข้ามจังหวัด',
      badge_en: 'Inter-Province'
    },
    {
      id: 'srv-6',
      slug: 'chiang-mai-to-pai',
      title_th: 'รถเชียงใหม่ไปปาย - แม่ฮ่องสอน',
      title_en: 'Chiang Mai to Pai & Mae Hong Son',
      desc_th: 'เดินทางผ่านโค้งปายอย่างปลอดภัย ด้วยคนขับชำนาญทางภูเขาสูงชัน ปรับแผนแวะพักได้',
      desc_en: 'Safe mountain driver taking you through Pai curves and Mae Hong Son tea villages.',
      image: '/images/ban_rak_thai.jpg?v=fixed_20260808',
      price: '2,500',
      passengers: '1-10 ท่าน',
      badge_th: 'เซียนทางโค้งดอย',
      badge_en: 'Mountain Expert'
    }
  ];

  return (
    <section id="services" className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            {language === 'th' ? 'บริการยอดนิยม' : 'Our Services'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            {t('services.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {language === 'th'
              ? 'ครอบคลุมทุกการเดินทางในเชียงใหม่และภาคเหนือ พร้อมคนขับชำนาญเส้นทาง ปลอดภัย ตรงเวลา'
              : 'Complete transport options covering Chiang Mai & Northern Thailand with expert local drivers.'}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(srv => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={srv.image}
                  alt={srv.title_th}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero_chiangmai_car.jpg?v=fixed_20260808';
                  }}
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-500/30">
                  {language === 'th' ? srv.badge_th : srv.badge_en}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1.5 rounded-lg border border-slate-700">
                  {language === 'th' ? `เริ่มต้น ${srv.price} ฿` : `From ${srv.price} THB`}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>{srv.passengers}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {language === 'th' ? srv.title_th : srv.title_en}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {language === 'th' ? srv.desc_th : srv.desc_en}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectServiceSlug(srv.slug)}
                    className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors text-center"
                  >
                    {language === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                  </button>

                  <button
                    onClick={() => openQuoteModal({ destination: srv.title_th })}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{language === 'th' ? 'เช็กคิว' : 'Check Queue'}</span>
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
