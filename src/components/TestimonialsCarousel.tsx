import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquareHeart, Quote, Store, TrendingUp } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export const TestimonialsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#F2EBE3]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-xs font-semibold text-[#8A6700] mb-4">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#C79801]" />
            <span>RESULTADOS DE QUEM JÁ APLICA</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1D12] tracking-tight mb-3">
            O carinho que vira postagem no Instagram e clientes fiéis
          </h2>
          <p className="text-sm sm:text-base text-[#5A422D] leading-relaxed">
            Veja o que outros donos de delivery estão vivenciando em suas entregas diárias.
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="relative max-w-3xl mx-auto">
          
          {/* Main Testimonial Card */}
          <div className="bg-[#FAF6F0] rounded-3xl border border-[#E8DFD5] p-6 sm:p-10 shadow-craft-lg transition-all duration-300 relative">
            
            {/* Top Stars & Impact Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E1AD01] text-[#C79801]" />
                ))}
                <span className="text-xs font-bold text-[#2B1D12] ml-1.5">5.0 / 5.0</span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-[#2E7D32]/10 text-[#2E7D32]">
                <TrendingUp className="w-3.5 h-3.5" />
                {current.impactTag}
              </span>
            </div>

            {/* Testimonial Quote */}
            <div className="mb-6 relative">
              <Quote className="w-8 h-8 text-[#E1AD01]/30 absolute -top-4 -left-2 -z-0" />
              <p className="text-base sm:text-lg text-[#2B1D12] font-medium leading-relaxed relative z-10">
                "{current.message}"
              </p>
            </div>

            {/* Client Real Reaction Bubble (Sub-card style) */}
            <div className="p-4 rounded-xl bg-[#F2EBE3] border border-[#E8DFD5] mb-6 text-sm text-[#4B3621]">
              <span className="text-[11px] font-bold text-[#8A6700] uppercase tracking-wider block mb-1">
                💬 Mensagem recebida no WhatsApp do cliente:
              </span>
              <p className="italic text-[#2B1D12] font-serif text-sm">
                {current.customerFeedback}
              </p>
            </div>

            {/* Owner & Business Info */}
            <div className="flex items-center justify-between border-t border-[#E8DFD5] pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E1AD01]/20 border border-[#C79801]/30 flex items-center justify-center font-bold text-sm text-[#8A6700]">
                  {current.ownerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2B1D12]">{current.businessName}</h4>
                  <p className="text-xs text-[#6B533E]">{current.segment} • {current.city}</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#8A6700]">
                <Store className="w-3.5 h-3.5 text-[#C79801]" />
                <span>{current.ownerName}</span>
              </div>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              type="button"
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-[#FAF6F0] hover:bg-[#FFFDF9] border border-[#E8DFD5] text-[#4B3621] hover:text-[#C79801] shadow-xs transition-all cursor-pointer"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-6 bg-[#C79801]' : 'w-2 bg-[#D3C5B4]'
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-[#FAF6F0] hover:bg-[#FFFDF9] border border-[#E8DFD5] text-[#4B3621] hover:text-[#C79801] shadow-xs transition-all cursor-pointer"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
