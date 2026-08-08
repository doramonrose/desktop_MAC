import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { QuoteModalProvider } from './context/QuoteModalContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PopularServices } from './components/PopularServices';
import { VehicleSection } from './components/VehicleSection';
import { PopularTourPackages } from './components/PopularTourPackages';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BookingSteps } from './components/BookingSteps';
import { CustomerReviews } from './components/CustomerReviews';
import { TrustSafetySection } from './components/TrustSafetySection';
import { FAQSection } from './components/FAQSection';
import { CallToActionSection } from './components/CallToActionSection';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SEOHead } from './components/SEOHead';
import { RouteLandingPage } from './components/pages/RouteLandingPage';
import { DirectoryPages } from './components/pages/DirectoryPages';
import { ROUTE_SEO_DATABASE, RouteSEOData } from './data/seoRouteData';
import { usePathname, navigateTo } from './utils/router';

function findRouteData(pathname: string): RouteSEOData | null {
  if (ROUTE_SEO_DATABASE[pathname]) return ROUTE_SEO_DATABASE[pathname];
  for (const route of Object.values(ROUTE_SEO_DATABASE)) {
    if (route.enPath === pathname) return route;
  }
  return null;
}

import {
  INITIAL_SETTINGS,
  INITIAL_VEHICLES,
  INITIAL_PACKAGES,
  INITIAL_REVIEWS,
  INITIAL_FAQS
} from './data/initialData';
import { QuoteRequest, SiteSettings } from './types';

export function AppContent() {
  const currentPath = usePathname();

  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const loadSiteData = async () => {
      try {
        const res = await fetch('/api/site-data');
        if (!res.ok) return;
        const data = await res.json();
        if (data.settings) {
          setSettings({
            ...INITIAL_SETTINGS,
            ...data.settings,
            phone: data.settings.phone || INITIAL_SETTINGS.phone,
            line_id: data.settings.line_id || INITIAL_SETTINGS.line_id,
            line_url: data.settings.line_url || INITIAL_SETTINGS.line_url,
          });
        }
      } catch (err) {
        console.error('Failed to load site data:', err);
      }
    };

    loadSiteData();
  }, []);

  useEffect(() => {
    if (!isAdminOpen) return;

    const loadQuotes = async () => {
      try {
        const res = await fetch('/api/admin/quotes');
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.quotes)) {
          setQuoteRequests(data.quotes);
        }
      } catch (err) {
        console.error('Failed to load quotes:', err);
      }
    };

    loadQuotes();
  }, [isAdminOpen]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleUpdateSettings = async (newSettings: Partial<SiteSettings>) => {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings),
    });
    const payload = await res.json();
    if (!res.ok || !payload.success) {
      throw new Error(payload.error || 'Failed to update settings');
    }
    setSettings(prev => ({ ...prev, ...payload.settings }));
  };

  const handleUpdateQuoteStatus = async (id: string, status: QuoteRequest['status']) => {
    const res = await fetch(`/api/admin/quotes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const payload = await res.json();
    if (!res.ok || !payload.success) {
      throw new Error(payload.error || 'Failed to update quote');
    }
    setQuoteRequests(prev => prev.map(q => (q.id === id ? payload.quote : q)));
  };

  const handleDeleteQuote = async (id: string) => {
    const res = await fetch(`/api/admin/quotes/${id}`, { method: 'DELETE' });
    const payload = await res.json();
    if (!res.ok || !payload.success) {
      throw new Error(payload.error || 'Failed to delete quote');
    }
    setQuoteRequests(prev => prev.filter(q => q.id !== id));
  };

  const matchedRouteData = findRouteData(currentPath);

  const renderCurrentView = () => {
    if (matchedRouteData) {
      return (
        <RouteLandingPage
          routeData={matchedRouteData}
          settings={settings}
          reviews={INITIAL_REVIEWS}
        />
      );
    }

    if (currentPath === '/cars/') {
      return <DirectoryPages type="cars" vehicles={INITIAL_VEHICLES} packages={INITIAL_PACKAGES} reviews={INITIAL_REVIEWS} faqs={INITIAL_FAQS} settings={settings} />;
    }

    if (currentPath === '/tour-packages/') {
      return <DirectoryPages type="tour-packages" vehicles={INITIAL_VEHICLES} packages={INITIAL_PACKAGES} reviews={INITIAL_REVIEWS} faqs={INITIAL_FAQS} settings={settings} />;
    }

    if (currentPath === '/reviews/') {
      return <DirectoryPages type="reviews" vehicles={INITIAL_VEHICLES} packages={INITIAL_PACKAGES} reviews={INITIAL_REVIEWS} faqs={INITIAL_FAQS} settings={settings} />;
    }

    if (currentPath === '/about/') {
      return <DirectoryPages type="about" vehicles={INITIAL_VEHICLES} packages={INITIAL_PACKAGES} reviews={INITIAL_REVIEWS} faqs={INITIAL_FAQS} settings={settings} />;
    }

    if (currentPath === '/contact/') {
      return <DirectoryPages type="contact" vehicles={INITIAL_VEHICLES} packages={INITIAL_PACKAGES} reviews={INITIAL_REVIEWS} faqs={INITIAL_FAQS} settings={settings} />;
    }

    if (currentPath === '/faq/') {
      return <DirectoryPages type="faq" vehicles={INITIAL_VEHICLES} packages={INITIAL_PACKAGES} reviews={INITIAL_REVIEWS} faqs={INITIAL_FAQS} settings={settings} />;
    }

    const isEn = currentPath.startsWith('/en');
    const homepageTitle = isEn 
      ? 'Chiang Mai Private Driver Service | Sedan, SUV, VIP Van | MR Car Rent'
      : 'รถเช่าพร้อมคนขับเชียงใหม่ | รถเก๋ง SUV รถตู้ เริ่ม 1,200 บาท';
    const homepageDesc = isEn
      ? 'Private car rental with driver in Chiang Mai, airport transfers, day tours to Mae Kampong, Mon Jam & Pai.'
      : 'รถเช่าพร้อมคนขับเชียงใหม่ รถเก๋ง SUV และรถตู้ รับส่งสนามบิน เหมารถเที่ยวเชียงใหม่และต่างจังหวัด เช็กคิวและขอราคาผ่าน LINE ได้ทันที';

    return (
      <>
        <SEOHead
          title={homepageTitle}
          description={homepageDesc}
          canonicalUrl={isEn ? 'https://mrcarrentcm.com/en/' : 'https://mrcarrentcm.com/'}
          lang={isEn ? 'en' : 'th'}
        />
        <HeroSection settings={settings} onNavigate={scrollToSection} />
        <PopularServices onSelectServiceSlug={slug => {
          if (ROUTE_SEO_DATABASE[`/${slug}/`]) {
            navigateTo(`/${slug}/`);
          } else {
            setSelectedSlug(slug);
          }
        }} />
        <VehicleSection vehicles={INITIAL_VEHICLES} />
        <PopularTourPackages
          packages={INITIAL_PACKAGES}
          onSelectPackageSlug={slug => {
            if (ROUTE_SEO_DATABASE[`/${slug}/`]) {
              navigateTo(`/${slug}/`);
            } else {
              setSelectedSlug(slug);
            }
          }}
        />
        <WhyChooseUs />
        <BookingSteps />
        <CustomerReviews reviews={INITIAL_REVIEWS} />
        <TrustSafetySection />
        <FAQSection faqs={INITIAL_FAQS} />
        <CallToActionSection settings={settings} />
      </>
    );
  };

  return (
    <QuoteModalProvider lineUrl={settings.line_url}>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 pb-20 md:pb-0">
        <Header
          settings={settings}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        <main className="pt-16 sm:pt-20">
          {renderCurrentView()}
        </main>

        <Footer settings={settings} onOpenAdmin={() => setIsAdminOpen(true)} />
        <StickyMobileBar settings={settings} />

        <ServiceDetailModal
          slug={selectedSlug}
          packages={INITIAL_PACKAGES}
          onClose={() => setSelectedSlug(null)}
        />

        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          settings={settings}
          quotes={quoteRequests}
          onUpdateSettings={handleUpdateSettings}
          onUpdateQuoteStatus={handleUpdateQuoteStatus}
          onDeleteQuote={handleDeleteQuote}
        />
      </div>
    </QuoteModalProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

