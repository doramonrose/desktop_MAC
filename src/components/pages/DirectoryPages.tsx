import React from 'react';
import { SEOHead } from '../SEOHead';
import { useLanguage } from '../../context/LanguageContext';
import { useQuoteModal } from '../../context/QuoteModalContext';
import { Vehicle, TourPackage, Review, FAQItem, SiteSettings } from '../../types';
import { navigateTo } from '../../utils/router';
import { ROUTE_SEO_DATABASE } from '../../data/seoRouteData';
import { LineQrBlock } from '../LineQrBlock';
import { 
  Car, 
  Users, 
  Briefcase, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface DirectoryPageProps {
  type: 'cars' | 'tour-packages' | 'reviews' | 'about' | 'contact' | 'faq';
  vehicles: Vehicle[];
  packages: TourPackage[];
  reviews: Review[];
  faqs: FAQItem[];
  settings: SiteSettings;
}

export const DirectoryPages: React.FC<DirectoryPageProps> = ({
  type,
  vehicles,
  packages,
  reviews,
  faqs,
  settings
}) => {
  const { language } = useLanguage();
  const { openQuoteModal } = useQuoteModal();
  const isTh = language === 'th';

  // Helper for rendering cars directory
  if (type === 'cars') {
    const title = isTh 
      ? 'ประเภทรถเช่าพร้อมคนขับเชียงใหม่ รถเก๋ง SUV รถตู้ VIP | MR Car Rent'
      : 'Vehicle Fleet Chiang Mai | Sedan, SUV & VIP Van Rental';
    const description = isTh
      ? 'รวมเลือกรถเช่าพร้อมคนขับเชียงใหม่ Toyota Yaris Ativ, Altis, Fortuner Leader, Commuter VIP 10 ที่นั่ง เช็กสเปกและราคาเช่า'
      : 'Choose your preferred rental vehicle in Chiang Mai. Modern Sedans, Fortuner SUVs, and 10-Seater VIP Vans.';
    const canonical = `https://mrcarrentcm.com/cars/`;

    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <SEOHead title={title} description={description} canonicalUrl={canonical} lang={language} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">{isTh ? 'ยานพาหนะของเรา' : 'OUR VEHICLE FLEET'}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
              {isTh ? 'รถเช่าพร้อมคนขับเชียงใหม่ ทุกประเภท สะอาด รถใหม่ ปลอดภัย' : 'Chiang Mai Private Vehicle Fleet'}
            </h1>
            <p className="text-slate-600 mt-3 text-base">
              {isTh ? 'เลือกรถที่ตรงกับจำนวนผู้โดยสารและสไตล์การเดินทางของคุณ มั่นใจด้วยมาตรฐานความสะอาด และคนขับชำนาญทาง' : 'Select the perfect ride for your trip with certified drivers.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((veh) => (
              <div key={veh.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="relative h-52 bg-slate-100">
                  <img
                    src={veh.image}
                    alt={isTh ? veh.name_th : veh.name_en}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/sedan_vios_chiangmai.jpg?v=fixed_20260808';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 text-amber-400 font-bold px-3 py-1 rounded-full text-xs">
                    {isTh ? 'เริ่มต้น' : 'From'} ฿{veh.price_start.toLocaleString()}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{isTh ? veh.name_th : veh.name_en}</h2>
                    <p className="text-slate-600 text-xs mb-4">{isTh ? veh.description_th : veh.description_en}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> {veh.capacity_passengers}</div>
                      <div className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> {veh.capacity_luggage}</div>
                    </div>

                    <div className="space-y-1.5 mb-6">
                      {(isTh ? veh.amenities_th : veh.amenities_en).map((am, idx) => (
                        <div key={idx} className="flex items-center text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5 flex-shrink-0" />
                          <span>{am}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openQuoteModal({ vehicle_id: veh.id })}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-colors"
                  >
                    {isTh ? 'เช็กคิวและขอราคาคันนี้' : 'Book This Vehicle'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tour packages directory
  if (type === 'tour-packages') {
    const title = isTh 
      ? 'แพ็กเกจเหมารถเที่ยวเชียงใหม่ ยอดนิยม แม่กำปอง อินทนนท์ เชียงราย | MR Car Rent'
      : 'Chiang Mai Popular Tour Packages & Routes | MR Car Rent';
    const description = isTh
      ? 'แพ็กเกจนำเที่ยวเชียงใหม่และภาคเหนือ พร้อมคนขับ รวมค่าน้ำมันและประกันภัย ปรับเปลี่ยนโปรแกรมได้ตามต้องการ'
      : 'Popular day tour packages in Chiang Mai: Mae Kampong, Doi Inthanon, Mon Jam, Chiang Rai & Pai.';
    const canonical = `https://mrcarrentcm.com/tour-packages/`;

    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <SEOHead title={title} description={description} canonicalUrl={canonical} lang={language} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">{isTh ? 'เส้นทางนำเที่ยวยอดนิยม' : 'POPULAR TOUR ROUTES'}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
              {isTh ? 'แพ็กเกจเหมารถเที่ยวเชียงใหม่ พร้อมคนขับชำนาญทาง' : 'Chiang Mai Private Day Tours & Packages'}
            </h1>
            <p className="text-slate-600 mt-3 text-base">
              {isTh ? 'เลือกเส้นทางท่องเที่ยวเชียงใหม่สุดฮิต หรือปรับเปลี่ยนเส้นทางได้ตามความต้องการของคุณ' : 'Choose a signature tour route or build your own custom trip.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(ROUTE_SEO_DATABASE).map((route) => (
              <div key={route.path} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-slate-100">
                  <img
                    src={route.hero_image}
                    alt={isTh ? route.h1_th : route.h1_en}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/doi_inthanon.jpg?v=fixed_20260808';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full text-xs">
                    {isTh ? 'เริ่มต้น' : 'From'} ฿{route.price_start.toLocaleString()}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                      {isTh ? route.h1_th : route.h1_en}
                    </h2>
                    <p className="text-slate-600 text-xs mb-4 line-clamp-3">
                      {isTh ? route.description_th : route.description_en}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => navigateTo(route.path)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center"
                    >
                      {isTh ? 'ดูรายละเอียดและราคา' : 'View Details & Rates'}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Reviews page
  if (type === 'reviews') {
    const title = isTh ? 'รีวิวจากลูกค้าจริง รถเช่าพร้อมคนขับเชียงใหม่ MR Car Rent' : 'Customer Reviews | MR Car Rent Chiang Mai';
    const description = isTh ? 'อ่านรีวิวและความประทับใจจากลูกค้าจริงที่ใช้บริการรถเช่าพร้อมคนขับเชียงใหม่ ทั้งนักท่องเที่ยวไทยและต่างชาติ' : 'Read genuine customer reviews for our private driver service in Chiang Mai.';
    const canonical = `https://mrcarrentcm.com/reviews/`;

    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <SEOHead title={title} description={description} canonicalUrl={canonical} lang={language} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">{isTh ? 'รีวิวจากลูกค้าจริง' : 'CUSTOMER REVIEWS'}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
              {isTh ? 'ความประทับใจจากลูกค้า รถเช่าพร้อมคนขับเชียงใหม่' : 'What Our Customers Say About Us'}
            </h1>
            <p className="text-slate-600 mt-2 text-sm">{isTh ? 'คะแนนประเมิน 5.0 เต็มจากลูกค้ากว่า 180+ ทริปบน Google และ LINE' : 'Rated 5.0/5 stars across 180+ trips.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">{rev.author}</h2>
                    <span className="text-xs text-slate-500">{isTh ? rev.location_th : rev.location_en}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                    {rev.source}
                  </span>
                </div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
                  "{isTh ? rev.comment_th : rev.comment_en}"
                </p>
                <div className="text-xs text-amber-700 font-medium bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 w-fit">
                  {isTh ? rev.route_th : rev.route_en} ({rev.vehicle_type})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // About page
  if (type === 'about') {
    const title = isTh ? 'เกี่ยวกับเรา MR Car Rent Chiang Mai บริการรถเช่าพร้อมคนขับ' : 'About Us | MR Car Rent Chiang Mai';
    const description = isTh ? 'ทำความรู้จัก MR Car Rent Chiang Mai ผู้ให้บริการรถเช่าพร้อมคนขับมืออาชีพ มุ่งมั่นให้บริการด้วยความปลอดภัย สุภาพ และตรงเวลา' : 'Learn more about MR Car Rent Chiang Mai - Professional private car with driver service.';
    const canonical = `https://mrcarrentcm.com/about/`;

    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <SEOHead title={title} description={description} canonicalUrl={canonical} lang={language} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-6">
            <h1 className="text-3xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
              {isTh ? 'เกี่ยวกับ MR Car Rent Chiang Mai' : 'About MR Car Rent Chiang Mai'}
            </h1>
            <p className="text-slate-700 leading-relaxed text-base">
              {isTh
                ? 'MR Car Rent Chiang Mai เป็นผู้ให้บริการรถเช่าพร้อมคนขับในจังหวัดเชียงใหม่และพื้นที่ภาคเหนือ เราก่อตั้งขึ้นด้วยความตั้งใจที่จะยกระดับมาตรฐานการท่องเที่ยวแบบส่วนตัว ให้ผู้เดินทางได้รับความสะดวกสบาย ความปลอดภัยสูงสุด และความประทับใจตลอดการเดินทาง'
                : 'MR Car Rent Chiang Mai is a premier private car with driver service operating in Chiang Mai and Northern Thailand.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <ShieldCheck className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h2 className="font-bold text-slate-900 text-sm mb-1">{isTh ? 'คนขับชำนาญทาง' : 'Certified Drivers'}</h2>
                <p className="text-xs text-slate-600">{isTh ? 'ชำนาญทางโค้งดอย สุภาพ ตรงเวลา' : 'Mountain certified & polite'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <Car className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h2 className="font-bold text-slate-900 text-sm mb-1">{isTh ? 'รถใหม่สะอาด' : 'Clean Vehicles'}</h2>
                <p className="text-xs text-slate-600">{isTh ? 'ตรวจเช็กสภาพสม่ำเสมอ แอร์เย็นฉ่ำ' : 'Well maintained & cool AC'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <CheckCircle2 className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h2 className="font-bold text-slate-900 text-sm mb-1">{isTh ? 'ราคาชัดเจน' : 'Transparent Pricing'}</h2>
                <p className="text-xs text-slate-600">{isTh ? 'ไม่มีค่าใช้จ่ายแอบแฝง' : 'No hidden fees'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Contact page
  if (type === 'contact') {
    const title = isTh ? 'ติดต่อเรา MR Car Rent Chiang Mai เบอร์โทร LINE แผนที่' : 'Contact Us | MR Car Rent Chiang Mai';
    const description = isTh ? 'ช่องทางการติดต่อ MR Car Rent Chiang Mai เบอร์โทร 065-645-5104, LINE @mrcarrentcm, ที่อยู่ และแผนที่ตั้งบริษัท' : 'Contact MR Car Rent Chiang Mai. Phone: 065-645-5104, LINE: @mrcarrentcm.';
    const canonical = `https://mrcarrentcm.com/contact/`;

    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <SEOHead title={title} description={description} canonicalUrl={canonical} lang={language} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900">
              {isTh ? 'ติดต่อเรา MR Car Rent Chiang Mai' : 'Contact MR Car Rent Chiang Mai'}
            </h1>
            <p className="text-slate-600 mt-2 text-sm">{isTh ? 'ทีมงานยินดีต้อนรับและพร้อมให้บริการตอบข้อสงสัยตลอด 24 ชั่วโมง' : 'We are ready to assist you 24/7.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">{isTh ? 'ข้อมูลการติดต่อ (NAP)' : 'Contact Details'}</h2>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold">{isTh ? 'ที่อยู่บริษัท' : 'Address'}</div>
                  <div className="text-sm font-medium text-slate-800">{isTh ? settings.address_th : settings.address_en}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold">{isTh ? 'เบอร์โทรศัพท์' : 'Phone'}</div>
                  <a href={`tel:${settings.phone}`} className="text-base font-bold text-amber-600 hover:underline">{settings.phone}</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold">LINE ID</div>
                  <a href={settings.line_url} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-emerald-600 hover:underline">{settings.line_id}</a>
                </div>
              </div>

              <div className="pt-2">
                <LineQrBlock settings={settings} language={language} size="lg" variant="light" />
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold">{isTh ? 'เวลาทำการ' : 'Operating Hours'}</div>
                  <div className="text-sm text-slate-800">{isTh ? settings.operating_hours_th : settings.operating_hours_en}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => openQuoteModal()}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors shadow-sm"
                >
                  {isTh ? 'ส่งคำขอใบเสนอราคา' : 'Request Instant Quote'}
                </button>
              </div>
            </div>

            {/* Map Embed */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
              <h2 className="text-lg font-bold text-slate-900 mb-3 px-2">{isTh ? 'แผนที่การเดินทาง' : 'Location Map'}</h2>
              <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200">
                <iframe
                  title="MR Car Rent Chiang Mai Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.123456789!2d98.9660!3d18.8005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQ4JzAxLjgiTiA5OMKwNTcnNTcuNiJF!5e0!3m2!1sth!2sth!4v1620000000000!5m2!1sth!2sth"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FAQ page
  if (type === 'faq') {
    const title = isTh ? 'คำถามที่พบบ่อย (FAQ) รถเช่าพร้อมคนขับเชียงใหม่ | MR Car Rent' : 'FAQ | MR Car Rent Chiang Mai';
    const description = isTh ? 'รวมคำถามที่พบบ่อยเกี่ยวกับการเช่ารถพร้อมคนขับเชียงใหม่ การคิดค่าน้ำมัน ขั้นตอนการจอง และการชำระเงิน' : 'Frequently asked questions about private driver rental in Chiang Mai.';
    const canonical = `https://mrcarrentcm.com/faq/`;

    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <SEOHead title={title} description={description} canonicalUrl={canonical} lang={language} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900">{isTh ? 'คำถามที่พบบ่อย (FAQ)' : 'Frequently Asked Questions'}</h1>
            <p className="text-slate-600 text-sm mt-2">{isTh ? 'คำตอบสำหรับข้อสงสัยยอดนิยมเกี่ยวกับการบริการรถเช่าพร้อมคนขับเชียงใหม่' : 'Everything you need to know about our service.'}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
            {faqs.map((f) => (
              <div key={f.id} className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900 mb-2">Q: {isTh ? f.question_th : f.question_en}</h2>
                <p className="text-slate-600 text-sm leading-relaxed">A: {isTh ? f.answer_th : f.answer_en}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
