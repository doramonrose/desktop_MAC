import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Review } from '../types';
import { Star, Quote, CheckCircle, MessageCircle, ThumbsUp, MapPin } from 'lucide-react';

interface CustomerReviewsProps {
  reviews: Review[];
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  const { language, t } = useLanguage();

  return (
    <section id="reviews" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            {language === 'th' ? 'เสียงตอบรับจากลูกค้า' : 'Customer Reviews'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            {t('reviews.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {language === 'th'
              ? 'รีวิวจริงจากลูกค้าที่ใช้บริการรถเช่าพร้อมคนขับกับ MR Car Rent Chiang Mai'
              : 'Verified customer feedback from Google Reviews, Facebook & LINE.'}
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Author Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {rev.author}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{language === 'th' ? rev.location_th : rev.location_en}</span>
                    </p>
                  </div>

                  {/* Source Badge */}
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                    rev.source === 'Google'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : rev.source === 'Facebook'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {rev.source} Review
                  </span>
                </div>

                {/* Service Tag */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 mb-4 flex flex-wrap gap-2">
                  <span className="text-amber-800 font-bold">
                    {language === 'th' ? 'เส้นทาง:' : 'Route:'} {language === 'th' ? rev.route_th : rev.route_en}
                  </span>
                  <span>•</span>
                  <span className="text-slate-600">{rev.vehicle_type}</span>
                </div>

                {/* Comment Text */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic relative">
                  "{language === 'th' ? rev.comment_th : rev.comment_en}"
                </p>
              </div>

              {/* Date */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{language === 'th' ? 'ลูกค้าใช้บริการจริง' : 'Verified Ride'}</span>
                </span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
