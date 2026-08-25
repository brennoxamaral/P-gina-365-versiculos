import React from 'react';
import { CheckCircle2, ArrowRight, Lock, Zap, Shield, Sparkles, Download } from 'lucide-react';
import { HeroProductMockup } from './HeroProductMockup';

interface HeroProps {
  onOpenCheckout: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout }) => {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Badge: Centered */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs text-xs sm:text-sm font-semibold text-[#8A6700] mb-6 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#C79801]" />
          <span>ARQUIVO DIGITAL PRONTO PARA IMPRESSÃO EM A4</span>
        </div>

        {/* Headline H1 (Mandatory exact wording, centered) */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2B1D12] tracking-tight leading-[1.15] max-w-4xl mb-6">
          Leve a Palavra de Deus no seu delivery e fidelize seus clientes.
        </h1>

        {/* Subheadline & Bullets (Short, objective, centered) */}
        <p className="text-base sm:text-lg md:text-xl text-[#5A422D] max-w-2xl font-normal leading-relaxed mb-6">
          Transforme cada entrega em uma experiência inesquecível de afeto e fé com bilhetes diários prontos para imprimir, cortar e grampear.
        </p>

        {/* Quick Checkpoint Bullets (Centered) */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-sm text-[#4B3621] font-medium mb-8">
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
            <span>Custo de centavos por entrega</span>
          </div>
        </div>

        {/* Product Visual Mockup (Integrated smoothly directly on #F2EBE3 background, not trapped in card) */}
        <div className="w-full my-4">
          <HeroProductMockup />
        </div>

        {/* Primary CTA Button (Positioned directly UNDER the product visual) */}
        <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-md">
          <button
            type="button"
            onClick={onOpenCheckout}
            id="btn-hero-cta"
            className="w-full py-4 px-8 rounded-2xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-98 text-[#2B1D12] font-extrabold text-lg sm:text-xl tracking-tight shadow-gold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Download className="w-6 h-6 text-[#2B1D12] group-hover:-translate-y-0.5 transition-transform" />
            <span>QUERO MEU KIT • APENAS R$ 19,90</span>
            <ArrowRight className="w-5 h-5 text-[#2B1D12] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Microcopy of security & confidence */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#6B533E] font-medium pt-1">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#2E7D32]" /> Pagamento Único
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#C79801]" /> Envio Imediato no E-mail
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#2E7D32]" /> 7 Dias de Garantia
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
