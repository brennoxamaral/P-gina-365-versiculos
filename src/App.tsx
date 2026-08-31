import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { VerseInteractiveDemo } from './components/VerseInteractiveDemo';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { BonusSection } from './components/BonusSection';
import { PricingBox } from './components/PricingBox';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { StickyBottomCTA } from './components/StickyBottomCTA';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

export type PageRoute = 'home' | 'terms' | 'privacy';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Determina a rota com base no pathname ou hash atual
  const resolveRouteFromUrl = (): PageRoute => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (
      path.includes('termos') ||
      hash.includes('termos') ||
      path.includes('terms')
    ) {
      return 'terms';
    }

    if (
      path.includes('privacidade') ||
      hash.includes('privacidade') ||
      path.includes('privacy')
    ) {
      return 'privacy';
    }

    return 'home';
  };

  // Inicializa e escuta mudanças no histórico do navegador
  useEffect(() => {
    const initialRoute = resolveRouteFromUrl();
    setCurrentPage(initialRoute);

    const handleLocationChange = () => {
      const route = resolveRouteFromUrl();
      setCurrentPage(route);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (page: PageRoute, updateHistory = true) => {
    setCurrentPage(page);

    if (updateHistory) {
      let targetPath = '/';
      if (page === 'terms') {
        targetPath = '/termos-de-uso';
      } else if (page === 'privacy') {
        targetPath = '/privacidade';
      }

      window.history.pushState({ page }, '', targetPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F2EBE3] text-[#4B3621] flex flex-col selection:bg-[#E1AD01]/30 selection:text-[#2B1D12]">
      {/* Visualização de Subpáginas ou Página Principal */}
      {currentPage === 'terms' && (
        <>
          <TermsPage
            onNavigateHome={() => navigateTo('home')}
            onOpenCheckout={handleOpenCheckout}
          />
          <Footer
            onNavigateToTerms={() => navigateTo('terms')}
            onNavigateToPrivacy={() => navigateTo('privacy')}
            onNavigateHome={() => navigateTo('home')}
            onOpenCheckout={handleOpenCheckout}
          />
        </>
      )}

      {currentPage === 'privacy' && (
        <>
          <PrivacyPage
            onNavigateHome={() => navigateTo('home')}
            onOpenCheckout={handleOpenCheckout}
          />
          <Footer
            onNavigateToTerms={() => navigateTo('terms')}
            onNavigateToPrivacy={() => navigateTo('privacy')}
            onNavigateHome={() => navigateTo('home')}
            onOpenCheckout={handleOpenCheckout}
          />
        </>
      )}

      {currentPage === 'home' && (
        <>
          {/* 1. Header / Navbar */}
          <Header
            onOpenCheckout={handleOpenCheckout}
            onNavigateHome={() => navigateTo('home')}
          />

          {/* Main Page Flow */}
          <main className="flex-1">
            {/* 2. Hero Section */}
            <Hero onOpenCheckout={handleOpenCheckout} />

            {/* 3. Dedicated Video Demonstration Section */}
            <VideoSection />

            {/* 4. How It Works in 3 Steps */}
            <HowItWorks />

            {/* 5. Dynamic Interactive Bible Verse Demonstrator */}
            <VerseInteractiveDemo />

            {/* 6. Social Proof (Interactive Testimonials Carousel) */}
            <TestimonialsCarousel />

            {/* 7. Super Exclusive Bonus */}
            <BonusSection onOpenCheckout={handleOpenCheckout} />

            {/* 8. Pricing Box */}
            <PricingBox onOpenCheckout={handleOpenCheckout} />

            {/* 9. FAQ Accordion */}
            <FAQSection />
          </main>

          {/* 10. Footer */}
          <Footer
            onNavigateToTerms={() => navigateTo('terms')}
            onNavigateToPrivacy={() => navigateTo('privacy')}
            onNavigateHome={() => navigateTo('home')}
            onOpenCheckout={handleOpenCheckout}
          />

          {/* Sticky Bottom Bar for Mobile & Quick CTA */}
          {!isCheckoutOpen && (
            <StickyBottomCTA onOpenCheckout={handleOpenCheckout} />
          )}
        </>
      )}

      {/* Seamless Checkout & Download Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
      />
    </div>
  );
}
