import React from 'react';
import { ArrowRight, Sparkles, Download } from 'lucide-react';
import { HeroProductMockup } from './HeroProductMockup';

interface HeroProps {
  onOpenCheckout: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout }) => {
  return (
    <section id="hero-section" className="relative pt-12 pb-16 sm:pt-12 sm:pb-20 md:pt-14 md:pb-24 px-5 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Badge: Centered */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-2xs text-xs sm:text-[13px] font-medium text-[#8A6700] mb-5 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-[#C79801] shrink-0" />
          <span>PDF PRONTO PARA IMPRIMIR EM A4</span>
        </div>

        {/* Headline H1 (Centered) */}
        <h1 className="font-serif text-[length:clamp(2.125rem,1.5rem_+_2.6vw,3.25rem)] font-medium text-[#2B1D12] tracking-tight leading-[1.12] text-balance max-w-3xl mb-4 sm:mb-5">
          Envie a Palavra de Deus em cada pedido e fidelize clientes.
        </h1>

        {/* Subheadline (Short, objective, centered) */}
        <p className="text-[0.9375rem] sm:text-base md:text-[1.125rem] text-[#5A422D] max-w-[22rem] sm:max-w-xl font-normal leading-relaxed text-pretty mb-7 sm:mb-8">
          Transforme cada entrega em uma experiência inesquecível de afeto com bilhetes bíblicos que tocam o coração.
        </p>

        {/* Primary CTA Button (Visible above the fold on both Mobile & Desktop) */}
        <div className="mb-8 sm:mb-10 flex flex-col items-center gap-3 w-full">
          <button
            type="button"
            onClick={onOpenCheckout}
            id="btn-hero-cta"
            className="w-full max-w-sm sm:w-auto sm:max-w-full min-h-[48px] sm:min-h-[54px] py-3.5 sm:py-4 px-5 sm:px-8 rounded-2xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-98 text-[#2B1D12] font-semibold text-xs min-[360px]:text-sm sm:text-base md:text-[17px] tracking-tight shadow-gold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2 sm:gap-3 cursor-pointer group"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#2B1D12] shrink-0 group-hover:-translate-y-0.5 transition-transform" />
            <span className="whitespace-nowrap">Quero o meu PDF • R$ 37,00</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#2B1D12] shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Visual Mockup (Integrated smoothly directly on #F2EBE3 background, not trapped in card) */}
        <div className="w-full">
          <HeroProductMockup />
        </div>

      </div>
    </section>
  );
};
