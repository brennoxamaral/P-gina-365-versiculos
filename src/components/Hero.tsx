import React from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Download } from 'lucide-react';
import { HeroProductMockup } from './HeroProductMockup';

interface HeroProps {
  onOpenCheckout: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout }) => {
  return (
    <section id="hero-section" className="relative pt-10 pb-10 sm:pt-12 sm:pb-14 md:pt-16 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Badge: Centered */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs text-xs sm:text-sm font-semibold text-[#8A6700] mb-5 sm:mb-6 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C79801] shrink-0" />
          <span>ARQUIVO DIGITAL PRONTO PARA IMPRESSÃO EM A4</span>
        </div>

        {/* Headline H1 (Mandatory exact wording, centered) */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2B1D12] tracking-tight leading-[1.18] sm:leading-[1.15] max-w-4xl mb-4 sm:mb-6">
          Leve a Palavra de Deus no seu delivery e fidelize seus clientes.
        </h1>

        {/* Subheadline & Bullets (Short, objective, centered) */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#5A422D] max-w-2xl font-normal leading-relaxed mb-6">
          Transforme cada entrega em uma experiência inesquecível de afeto e fé com bilhetes diários prontos para imprimir, cortar e grampear.
        </p>

        {/* Quick Checkpoint Bullets (Centered) */}
        <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 sm:gap-x-8 text-xs sm:text-sm text-[#4B3621] font-medium mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
            <span>365 versículos bíblicos exclusivos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
            <span>Impressão em qualquer folha A4</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
            <span>Bônus: Template de cartão de agradecimento</span>
          </div>
        </div>

        {/* Primary CTA Button (Mobile Only: positioned before HeroProductMockup) */}
        <div className="sm:hidden mb-6 flex flex-col items-center gap-3 w-full">
          <button
            type="button"
            onClick={onOpenCheckout}
            id="btn-hero-cta"
            className="w-full max-w-sm min-h-[48px] py-3.5 px-5 rounded-2xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-98 text-[#2B1D12] font-extrabold text-xs min-[360px]:text-sm tracking-tight shadow-gold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Download className="w-4 h-4 text-[#2B1D12] shrink-0 group-hover:-translate-y-0.5 transition-transform" />
            <span className="whitespace-nowrap">QUERO MEU KIT • APENAS R$ 19,90</span>
            <ArrowRight className="w-4 h-4 text-[#2B1D12] shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Visual Mockup (Integrated smoothly directly on #F2EBE3 background, not trapped in card) */}
        <div className="w-full mt-4 mb-2">
          <HeroProductMockup />
        </div>

        {/* Primary CTA Button (Desktop Only: Positioned directly UNDER the product visual - strictly single line) */}
        <div className="hidden sm:flex mt-6 flex-col items-center gap-3 w-full">
          <button
            type="button"
            onClick={onOpenCheckout}
            id="btn-hero-cta-desktop"
            className="w-auto max-w-full min-h-[56px] py-4 px-8 rounded-2xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-98 text-[#2B1D12] font-extrabold text-base md:text-lg lg:text-xl tracking-tight shadow-gold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Download className="w-5 h-5 md:w-6 md:h-6 text-[#2B1D12] shrink-0 group-hover:-translate-y-0.5 transition-transform" />
            <span className="whitespace-nowrap">QUERO MEU KIT • APENAS R$ 19,90</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-[#2B1D12] shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
