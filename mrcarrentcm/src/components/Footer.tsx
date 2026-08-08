import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SiteSettings } from '../types';
import { Phone, MessageCircle, MapPin, Clock, Lock, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/images/logo_1786109093735.jpg';
import { LineQrBlock } from './LineQrBlock';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-700 p-0.5 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={logoImg}
                  alt="MR CAR RENT CM Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-lg"
                  decoding="async"
                />
              </div>
              <span className="font-black text-lg text-white tracking-tight">
                MR CAR RENT CHIANG MAI
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === 'th'
                ? 'บริการรถเช่าพร้อมคนขับเชียงใหม่ รถเก๋ง SUV และรถตู้ VIP บริการนำเที่ยว รับส่งสนามบิน และเดินทางข้ามจังหวัด ชำนาญเส้นทาง ปลอดภัย ตรงเวลา'
                : 'Chiang Mai private car & VIP van rental with driver. Sightseeing day tours, airport transfers and northern inter-city travel.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-amber-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'th' ? 'จดทะเบียนการค้าถูกต้อง ซื่อสัตย์ ปลอดภัย' : 'Registered Local Business'}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">
              {language === 'th' ? 'ข้อมูลติดต่อ' : 'Contact Us'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-bold">{settings.phone}</span>
                  <span className="text-slate-500">{language === 'th' ? 'โทรสอบถามได้ตลอดวัน' : 'Hotline Calls'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <a href={settings.line_url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-bold">
                    LINE ID: {settings.line_id}
                  </a>
                  <span className="block text-slate-500">{language === 'th' ? 'แชตตอบไวภายใน 5 นาที' : 'Fast Line Chat'}</span>
                </div>
              </li>
              <li className="pt-2">
                <LineQrBlock settings={settings} language={language} size="sm" variant="dark" />
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{language === 'th' ? settings.address_th : settings.address_en}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{language === 'th' ? 'เปิดบริการทุกวัน 06:00 - 22:00 น.' : 'Daily Operating Hours: 06:00 - 22:00'}</span>
              </li>
            </ul>
          </div>

          {/* Popular Services */}
          <div className="space-y-3">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">
              {language === 'th' ? 'บริการแนะนำ' : 'Popular Services'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• <a href="#services" className="hover:text-amber-400 transition-colors">{language === 'th' ? 'รถเช่าพร้อมคนขับเชียงใหม่' : 'Car Rental with Driver'}</a></li>
              <li>• <a href="#services" className="hover:text-amber-400 transition-colors">{language === 'th' ? 'รถรับส่งสนามบินเชียงใหม่ (CNX)' : 'Airport Transfer'}</a></li>
              <li>• <a href="#vehicles" className="hover:text-amber-400 transition-colors">{language === 'th' ? 'รถตู้พร้อมคนขับ VIP 10 ที่นั่ง' : 'VIP Van Rental'}</a></li>
              <li>• <a href="#packages" className="hover:text-amber-400 transition-colors">{language === 'th' ? 'เหมารถเที่ยว ดอยอินทนนท์ / แม่กำปอง' : 'Doi Inthanon & Mae Kampong Tour'}</a></li>
              <li>• <a href="#packages" className="hover:text-amber-400 transition-colors">{language === 'th' ? 'รถเหมารายวันไปปาย - แม่ฮ่องสอน / เชียงราย' : 'Chiang Rai & Pai Private Trips'}</a></li>
            </ul>
          </div>

          {/* Quick Links & Admin */}
          <div className="space-y-3">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">
              {language === 'th' ? 'เมนูด่วน' : 'Quick Navigation'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">{t('nav.services')}</a></li>
              <li><a href="#vehicles" className="hover:text-amber-400 transition-colors">{t('nav.vehicles')}</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">{t('nav.packages')}</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">{t('nav.about')}</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">{t('nav.faq')}</a></li>
            </ul>

            <div className="pt-4 border-t border-slate-900">
              <button
                id="footer-admin-btn"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{language === 'th' ? 'ระบบผู้ดูแลระบบ (Admin)' : 'Admin Portal'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} MR CAR RENT CHIANG MAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#faq" className="hover:text-slate-300 transition-colors">{language === 'th' ? 'เงื่อนไขการใช้บริการ' : 'Terms of Service'}</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">{language === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
