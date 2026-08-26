import React, { useState } from 'react';
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

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F2EBE3] text-[#4B3621] flex flex-col selection:bg-[#E1AD01]/30 selection:text-[#2B1D12]">
      {/* 1. Header / Navbar */}
      <Header />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 2. Hero Section (100% Centralized, Uncaged Product Mockup, Underneath CTA) */}
        <Hero onOpenCheckout={handleOpenCheckout} />

        {/* 3. Dedicated Video Demonstration Section (Vertical 9:16) */}
        <VideoSection />

        {/* 4. How It Works in 3 Steps */}
        <HowItWorks />

        {/* 5. Dynamic Interactive Bible Verse Demonstrator */}
        <VerseInteractiveDemo />

        {/* 6. Social Proof (Interactive Testimonials Carousel) */}
        <TestimonialsCarousel />

        {/* 7. Super Exclusive Bonus (Canva Thank You Card Template Mockup + Video Lesson) */}
        <BonusSection onOpenCheckout={handleOpenCheckout} />

        {/* 8. Pricing Box (Highlight Gold Card, R$ 19,90, 7 Days Guarantee) */}
        <PricingBox onOpenCheckout={handleOpenCheckout} />

        {/* 9. FAQ Accordion */}
        <FAQSection />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Seamless Checkout & Download Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
      />

      {/* Sticky Bottom Bar for Mobile & Smooth Scrolling Access */}
      <StickyBottomCTA onOpenCheckout={handleOpenCheckout} />
    </div>
  );
}
