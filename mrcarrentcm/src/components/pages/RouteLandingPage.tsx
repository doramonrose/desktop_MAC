import React from 'react';
import { RouteSEOData } from '../../data/seoRouteData';
import { SEOHead } from '../SEOHead';
import { useLanguage } from '../../context/LanguageContext';
import { useQuoteModal } from '../../context/QuoteModalContext';
import { SiteSettings, Review } from '../../types';
import { navigateTo } from '../../utils/router';
import { 
  Car, 
  Users, 
  Briefcase, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  MessageCircle, 
  HelpCircle, 
  Star, 
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface RouteLandingPageProps {
  routeData: RouteSEOData;
  settings: SiteSettings;
  reviews: Review[];
}

export const RouteLandingPage: React.FC<RouteLandingPageProps> = ({
  routeData,
  settings,
  reviews
}) => {
  const { language, setLanguage } = useLanguage();
  const { openQuoteModal } = useQuoteModal();
  const isEnPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/en');
  const isTh = !(isEnPath || language === 'en');

  React.useEffect(() => {
    if (isEnPath && language !== 'en') setLanguage('en');
    if (!isEnPath && language !== 'th' && routeData.path === window.location.pathname) {
      setLanguage('th');
    }
  }, [isEnPath, language, routeData.path, setLanguage]);

  const title = isTh ? routeData.title_th : routeData.title_en;
  const description = isTh ? routeData.description_th : routeData.description_en;
  const h1 = isTh ? routeData.h1_th : routeData.h1_en;
  const keywords = isTh ? routeData.keywords_th : routeData.keywords_en;
  const canonicalUrl = `https://mrcarrentcm.com${isTh ? routeData.path : routeData.enPath}`;
  const details = isTh ? routeData.details_th : routeData.details_en;

  // JSON-LD schema
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": isTh ? "หน้าแรก" : "Home",
          "item": "https://mrcarrentcm.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isTh ? "เส้นทางนำเที่ยว" : "Routes",
          "item": "https://mrcarrentcm.com/tour-packages/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": h1,
          "item": canonicalUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": h1,
      "provider": {
        "@type": "LocalBusiness",
        "name": "MR Car Rent Chiang Mai"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Chiang Mai"
      },
      "description": description,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "THB",
        "price": routeData.price_start,
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": routeData.faqs.map(faq => ({
        "@type": "Question",
        "name": isTh ? faq.q_th : faq.q_en,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isTh ? faq.a_th : faq.a_en
        }
      }))
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        keywords={keywords}
        ogImage={`https://mrcarrentcm.com${routeData.hero_image}`}
        lang={language}
        jsonLd={jsonLd}
      />

      {/* Breadcrumb Header */}
      <div className="bg-slate-900 text-slate-300 py-3 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs md:text-sm flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigateTo('/')} className="hover:text-amber-400 transition-colors">
            {isTh ? 'หน้าแรก' : 'Home'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <button onClick={() => navigateTo('/tour-packages/')} className="hover:text-amber-400 transition-colors">
            {isTh ? 'เส้นทางยอดนิยม' : 'Popular Routes'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <span className="text-amber-400 font-medium truncate">{h1}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={routeData.hero_image}
            alt={`${h1} MR Car Rent Chiang Mai`}
            width={1376}
            height={768}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero_chiangmai_car.jpg?v=fixed_20260808';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 mb-4 shadow-sm">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {isTh ? 'เส้นทางยอดนิยม เชียงใหม่' : 'Popular Chiang Mai Route'}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {h1}
            </h1>
            <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
              {isTh ? routeData.intro_th : routeData.intro_en}
            </p>

            {/* Key Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 p-3 rounded-xl">
                <div className="text-amber-400 text-xs font-medium">{isTh ? 'ราคาเริ่มต้น' : 'Starting From'}</div>
                <div className="text-xl font-bold text-white">฿{routeData.price_start.toLocaleString()}</div>
              </div>
              <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 p-3 rounded-xl">
                <div className="text-amber-400 text-xs font-medium">{isTh ? 'ระยะเวลา' : 'Duration'}</div>
                <div className="text-sm font-semibold text-white truncate">{isTh ? routeData.duration_th : routeData.duration_en}</div>
              </div>
              <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 p-3 rounded-xl">
                <div className="text-amber-400 text-xs font-medium">{isTh ? 'ความจุผู้โดยสาร' : 'Capacity'}</div>
                <div className="text-sm font-semibold text-white">{routeData.capacity_passengers}</div>
              </div>
              <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 p-3 rounded-xl">
                <div className="text-amber-400 text-xs font-medium">{isTh ? 'กระเป๋าเดินทาง' : 'Luggage'}</div>
                <div className="text-sm font-semibold text-white">{routeData.capacity_luggage}</div>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => openQuoteModal()}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base shadow-lg transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {isTh ? 'เช็กคิวและขอราคา' : 'Check Availability & Quote'}
              </button>
              <a
                href={settings.line_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {isTh ? 'สอบถามผ่าน LINE' : 'Chat on LINE'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* 1. Vehicles & Pricing Options */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 flex items-center">
            <Car className="w-6 h-6 text-amber-500 mr-2" />
            {isTh ? `รถที่เหมาะสำหรับการเดินทางเส้นทางนี้` : `Recommended Vehicles for this Route`}
          </h2>
          <p className="text-slate-600 text-sm mb-6">{details.pricing_notes}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {details.suitable_vehicles.map((v, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-5 hover:border-amber-400 transition-all bg-slate-50/50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800 mb-1">
                      {v.type}
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg">{v.name}</h3>
                  </div>
                </div>
                <div className="text-amber-600 font-extrabold text-2xl mb-3">
                  ฿{v.price.toLocaleString()} <span className="text-xs text-slate-500 font-normal">/ {isTh ? 'ทริป' : 'trip'}</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 mb-4">
                  <div className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> {v.capacity}</div>
                </div>
                <button
                  onClick={() => openQuoteModal()}
                  className="w-full py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  {isTh ? 'จองรถรุ่นนี้' : 'Book This Vehicle'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Sample Itinerary / Highlights */}
        {details.itinerary_example && details.itinerary_example.length > 0 && (
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 text-amber-500 mr-2" />
              {isTh ? 'ตัวอย่างโปรแกรมเที่ยวและจุดแวะยอดนิยม' : 'Sample Itinerary & Highlights'}
            </h2>
            <div className="relative border-l-2 border-amber-300 ml-3 md:ml-6 space-y-6">
              {details.itinerary_example.map((item, idx) => (
                <div key={idx} className="relative pl-6 md:pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-sm" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 w-fit">
                      {item.time}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 sm:ml-3 mt-1 sm:mt-0">{item.spot}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. What's Included / Excluded & Service Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-2" />
              {isTh ? 'สิ่งที่รวมในบริการ' : 'What is Included'}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {details.includes.map((inc, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <XCircle className="w-5 h-5 text-rose-500 mr-2" />
              {isTh ? 'สิ่งที่ไม่รวมในบริการ' : 'What is Excluded'}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {details.excludes.map((exc, i) => (
                <li key={i} className="flex items-start">
                  <XCircle className="w-4 h-4 text-rose-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 4. Booking Steps */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 md:p-8 shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
            {isTh ? '4 ขั้นตอนการจองง่ายๆ' : '4 Easy Booking Steps'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {details.booking_steps.map((step, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
                <div className="text-amber-400 font-bold text-sm mb-1">{step}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FAQs Section */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <HelpCircle className="w-6 h-6 text-amber-500 mr-2" />
            {isTh ? 'คำถามที่พบบ่อย (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {routeData.faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  Q: {isTh ? faq.q_th : faq.q_en}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A: {isTh ? faq.a_th : faq.a_en}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Real Customer Reviews */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500 mr-2" />
            {isTh ? 'รีวิวจริงจากลูกค้าที่ใช้บริการ' : 'Verified Customer Reviews'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.slice(0, 2).map((rev) => (
              <div key={rev.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-1 text-amber-400 mb-2">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic mb-3">
                  "{isTh ? rev.comment_th : rev.comment_en}"
                </p>
                <div className="text-xs text-slate-500 font-semibold">
                  {rev.author} • <span className="text-amber-600">{isTh ? rev.route_th : rev.route_en}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Related Routes Links */}
        <section className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
          <h3 className="font-bold text-slate-900 text-base mb-4">
            {isTh ? 'เส้นทางที่เกี่ยวข้องที่คุณอาจสนใจ' : 'Related Popular Routes'}
          </h3>
          <div className="flex flex-wrap gap-3">
            {routeData.related_routes.map((rel, i) => (
              <button
                key={i}
                onClick={() => navigateTo(rel.path)}
                className="inline-flex items-center px-4 py-2 bg-white hover:bg-amber-400 hover:text-slate-950 text-slate-800 text-sm font-medium rounded-lg border border-slate-300 transition-all shadow-sm"
              >
                {isTh ? rel.name_th : rel.name_en}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Call to Action */}
        <div className="bg-amber-500 rounded-2xl p-8 text-center text-slate-950 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            {isTh ? `พร้อมเดินทางสู่ ${h1} แล้วหรือยัง?` : `Ready for your ${h1}?`}
          </h2>
          <p className="text-slate-900 text-base mb-6 max-w-2xl mx-auto">
            {isTh 
              ? 'เช็กคิวรถว่างล่วงหน้า จองง่าย ไม่ต้องโอนเต็ม สอบถามราคาก่อนตัดสินใจได้ทันที'
              : 'Check vehicle availability now. Easy booking with clear upfront pricing.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => openQuoteModal()}
              className="px-8 py-3.5 bg-slate-950 text-white hover:bg-slate-900 font-bold text-base rounded-xl shadow-md transition-all"
            >
              {isTh ? 'เช็กคิวและขอราคา' : 'Check Availability & Quote'}
            </button>
            <a
              href={settings.line_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base rounded-xl shadow-md transition-all flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {isTh ? 'แอดไลน์สอบถาม @mrcarrentcm' : 'LINE: @mrcarrentcm'}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
