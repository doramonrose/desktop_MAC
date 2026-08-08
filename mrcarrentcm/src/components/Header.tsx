import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { SiteSettings } from '../types';
import { navigateTo, usePathname } from '../utils/router';
import logoImg from '../assets/images/logo_1786109093735.jpg';

interface HeaderProps {
  settings: SiteSettings;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ settings, activeSection, onNavigate }) => {
  const { language, setLanguage } = useLanguage();
  const { openQuoteModal } = useQuoteModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: language === 'th' ? 'หน้าแรก' : 'Home', path: language === 'th' ? '/' : '/en/' },
    { id: 'vehicles', label: language === 'th' ? 'รถและราคา' : 'Vehicles', path: '/cars/' },
    { id: 'packages', label: language === 'th' ? 'แพ็กเกจท่องเที่ยว' : 'Tour Routes', path: '/tour-packages/' },
    { id: 'reviews', label: language === 'th' ? 'รีวิวลูกค้า' : 'Reviews', path: '/reviews/' },
    { id: 'faq', label: language === 'th' ? 'คำถามที่พบบ่อย' : 'FAQ', path: '/faq/' },
    { id: 'about', label: language === 'th' ? 'เกี่ยวกับเรา' : 'About', path: '/about/' },
    { id: 'contact', label: language === 'th' ? 'ติดต่อเรา' : 'Contact', path: '/contact/' },
  ];

  const handleNavClick = (path: string, id: string) => {
    setMobileMenuOpen(false);
    if (currentPath === '/' || currentPath === '/en/') {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    navigateTo(path);
  };

  const handleLangSwitch = (targetLang: 'th' | 'en') => {
    setLanguage(targetLang);
    if (targetLang === 'en' && !currentPath.startsWith('/en')) {
      navigateTo('/en/');
    } else if (targetLang === 'th' && currentPath.startsWith('/en')) {
      navigateTo('/');
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 text-slate-800 border-b border-slate-100'
          : 'bg-gradient-to-b from-slate-900/90 to-slate-900/40 text-white py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="header-logo"
            onClick={() => handleNavClick(language === 'th' ? '/' : '/en/', 'home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-white p-0.5 shadow-md group-hover:scale-105 transition-transform overflow-hidden border border-amber-500/40 flex items-center justify-center shrink-0">
              <img
                src={logoImg}
                alt="MR CAR RENT CM Logo"
                width={44}
                height={44}
                className="w-full h-full object-cover rounded-lg"
                decoding="async"
              />
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-1.5 leading-none">
                <span className="text-amber-500">MR CAR RENT</span>
                <span className={isScrolled ? 'text-slate-900' : 'text-white'}>CHIANG MAI</span>
              </div>
              <p className={`text-[11px] font-medium leading-tight tracking-wide mt-0.5 ${isScrolled ? 'text-slate-500' : 'text-slate-200'}`}>
                {language === 'th' ? 'รถเช่าพร้อมคนขับเชียงใหม่' : 'Private Driver Chiang Mai'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.path, item.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  currentPath === item.path
                    ? 'text-amber-600 bg-amber-50 font-semibold'
                    : isScrolled
                    ? 'text-slate-700 hover:text-amber-600 hover:bg-slate-50'
                    : 'text-slate-100 hover:text-amber-400 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div id="header-actions" className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <div className={`flex items-center p-1 rounded-lg text-xs font-semibold border ${
              isScrolled ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/80 border-slate-700'
            }`}>
              <button
                onClick={() => handleLangSwitch('th')}
                className={`px-2 py-1 rounded ${language === 'th' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                TH
              </button>
              <button
                onClick={() => handleLangSwitch('en')}
                className={`px-2 py-1 rounded ${language === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                EN
              </button>
            </div>

            {/* Quick Phone */}
            <a
              href={`tel:${settings.phone}`}
              className={`hidden md:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border ${
                isScrolled ? 'border-amber-500 text-amber-700 hover:bg-amber-50' : 'border-amber-400 text-amber-400 hover:bg-amber-400/10'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phone}</span>
            </a>

            {/* Quote Button */}
            <button
              onClick={() => openQuoteModal()}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>{language === 'th' ? 'เช็กคิวรถ' : 'Book Now'}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${isScrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-slate-800/80'}`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleLangSwitch('th')}
              className={`py-2 text-center text-xs font-bold rounded-lg ${language === 'th' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
            >
              🇹🇭 ภาษาไทย
            </button>
            <button
              onClick={() => handleLangSwitch('en')}
              className={`py-2 text-center text-xs font-bold rounded-lg ${language === 'en' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
            >
              🇬🇧 English
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path, item.id)}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400 rounded-lg"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); openQuoteModal(); }}
              className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-sm rounded-xl text-center"
            >
              {language === 'th' ? 'เช็กคิวและขอราคา' : 'Check Availability'}
            </button>
            <a
              href={`tel:${settings.phone}`}
              className="w-full py-2.5 bg-slate-800 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
