import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircleHeart, ZoomIn, X } from 'lucide-react';
import { customerFeedbackPrints } from '../data/testimonials';

export const TestimonialsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Preload all testimonial images upfront
  useEffect(() => {
    customerFeedbackPrints.forEach((print) => {
      const img = new Image();
      img.src = print.image;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? customerFeedbackPrints.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === customerFeedbackPrints.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') setIsZoomOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentPrint = customerFeedbackPrints[activeIndex];

  return (
    <section id="depoimentos" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#F2EBE3]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-xs font-semibold text-[#8A6700] mb-4 shadow-xs">
            <MessageCircleHeart className="w-3.5 h-3.5 text-[#C79801]" />
            <span>REAÇÃO DOS CLIENTES</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1D12] tracking-tight mb-3">
            O carinho na embalagem que emociona e fideliza clientes
          </h2>

          <p className="text-sm sm:text-base text-[#5A422D] leading-relaxed">
            Veja mensagens reais enviadas no WhatsApp do nosso delivery por quem recebeu um versículo na sacola.
          </p>
        </div>

        {/* Carousel Layout: Clean Floating Card with Side Navigation */}
        <div className="relative max-w-xl mx-auto flex items-center justify-center gap-3 sm:gap-5 md:gap-6">
          
          {/* Desktop Left Nav Button */}
          <button
            type="button"
            onClick={prevSlide}
            className="hidden sm:flex shrink-0 w-11 h-11 rounded-full bg-[#FAF6F0] hover:bg-[#E1AD01] active:scale-95 border border-[#E8DFD5] hover:border-[#C79801] text-[#4B3621] hover:text-[#2B1D12] shadow-craft hover:shadow-gold items-center justify-center transition-all duration-300 cursor-pointer group"
            aria-label="Print anterior"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Main Card Viewport */}
          <div className="w-full max-w-lg">
            
            {/* Native Slider Card (Zero nested boxes, edge-to-edge screenshot) */}
            <div 
              className="relative w-full rounded-2xl sm:rounded-3xl border border-[#E8DFD5] shadow-craft-lg overflow-hidden bg-[#111B21] group select-none transition-all duration-300"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Horizontal Sliding Track */}
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {customerFeedbackPrints.map((print) => (
                  <div
                    key={print.id}
                    onClick={() => setIsZoomOpen(true)}
                    className="w-full shrink-0 relative flex items-center justify-center cursor-zoom-in bg-[#111B21]"
                  >
                    <img
                      src={print.image}
                      alt={print.alt}
                      className="w-full h-auto object-contain block select-none pointer-events-none"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

              {/* Floating Zoom Pill */}
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2B1D12]/85 backdrop-blur-md text-white text-xs font-medium shadow-md transition-all hover:bg-[#2B1D12] cursor-pointer"
                aria-label="Ampliar imagem do depoimento"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#E1AD01]" />
                <span>Ampliar</span>
              </button>
            </div>

            {/* Bottom Controls (Dots & Mobile Arrows) */}
            <div className="flex items-center justify-between sm:justify-center gap-4 mt-5 px-2">
              
              {/* Mobile Prev Button */}
              <button
                type="button"
                onClick={prevSlide}
                className="sm:hidden flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#FAF6F0] active:bg-[#E1AD01] border border-[#E8DFD5] text-[#4B3621] active:text-[#2B1D12] shadow-craft active:scale-95 transition-all cursor-pointer"
                aria-label="Print anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots & Indicator */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  {customerFeedbackPrints.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === idx 
                          ? 'w-8 bg-[#C79801] shadow-xs' 
                          : 'w-2.5 bg-[#D3C5B4] hover:bg-[#B5A89B]'
                      }`}
                      aria-label={`Ir para print ${idx + 1}`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-[#8A6700] uppercase tracking-wider">
                  Print {activeIndex + 1} de {customerFeedbackPrints.length}
                </span>
              </div>

              {/* Mobile Next Button */}
              <button
                type="button"
                onClick={nextSlide}
                className="sm:hidden flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#FAF6F0] active:bg-[#E1AD01] border border-[#E8DFD5] text-[#4B3621] active:text-[#2B1D12] shadow-craft active:scale-95 transition-all cursor-pointer"
                aria-label="Próximo print"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

          </div>

          {/* Desktop Right Nav Button */}
          <button
            type="button"
            onClick={nextSlide}
            className="hidden sm:flex shrink-0 w-11 h-11 rounded-full bg-[#FAF6F0] hover:bg-[#E1AD01] active:scale-95 border border-[#E8DFD5] hover:border-[#C79801] text-[#4B3621] hover:text-[#2B1D12] shadow-craft hover:shadow-gold items-center justify-center transition-all duration-300 cursor-pointer group"
            aria-label="Próximo print"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

        </div>

      </div>

      {/* Lightbox / Zoom Modal (with same visual effect as checkout modal) */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsZoomOpen(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-[#FAF6F0] rounded-3xl border-2 border-[#E1AD01] shadow-2xl overflow-hidden p-4 sm:p-6 text-[#4B3621] max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Matching Checkout Modal */}
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full text-[#6B533E] hover:bg-[#F2EBE3] hover:text-[#2B1D12] transition-colors cursor-pointer z-10"
              aria-label="Fechar visualização"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info matching modal aesthetics */}
            <div className="w-full text-center pb-2.5 border-b border-[#E8DFD5] mb-3">
              <span className="text-[11px] font-bold text-[#8A6700] uppercase tracking-wider">
                Depoimento Real no WhatsApp • Print {activeIndex + 1} de {customerFeedbackPrints.length}
              </span>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-[#111B21] border border-[#E8DFD5]">
              <img
                src={currentPrint.image}
                alt={currentPrint.alt}
                className="w-full h-auto max-h-[72vh] object-contain rounded-xl block"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
