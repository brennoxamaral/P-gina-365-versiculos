import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, Zap, Sparkles } from 'lucide-react';

interface StickyBottomCTAProps {
  onOpenCheckout: () => void;
}

export const StickyBottomCTA: React.FC<StickyBottomCTAProps> = ({ onOpenCheckout }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      // Exibir quando o usuário ultrapassar o botão principal na seção Hero
      const heroBtns = Array.from(
        document.querySelectorAll<HTMLElement>('#btn-hero-cta, #btn-hero-cta-desktop')
      );
      const visibleHeroBtn = heroBtns.find(
        (btn) => btn.offsetWidth > 0 || btn.offsetHeight > 0
      );

      if (visibleHeroBtn) {
        const rect = visibleHeroBtn.getBoundingClientRect();
        // Visível assim que o botão do Hero sai do topo da tela
        setVisible(rect.bottom < 0);
      } else {
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
          const rect = heroSection.getBoundingClientRect();
          setVisible(rect.bottom < 0);
        } else {
          setVisible(window.scrollY > 400);
        }
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    // Verificação inicial
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <aside
      aria-label="Aviso de compra rápida fixo"
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E8DFD5] pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] px-3.5 sm:px-6 shadow-[0_-4px_25px_rgba(75,54,33,0.12)] transition-all duration-300 ease-in-out ${
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        {/* Lado Esquerdo: Produto e Preço para Desktop / Tablet */}
        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#2B1D12]">
              Kit 365 Versículos para Delivery + Bônus
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#E1AD01]/20 text-[10px] font-bold text-[#8A6700]">
              <Sparkles className="w-2.5 h-2.5 text-[#C79801]" /> Vitalício
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B533E] mt-0.5">
            <span className="line-through text-[#8C7A6B]">De R$ 47,00</span>
            <span className="font-extrabold text-[#2B1D12] text-sm">Por R$ 19,90</span>
            <span className="text-[#2E7D32] font-semibold flex items-center gap-0.5">
              <Zap className="w-3 h-3 fill-[#2E7D32]" /> Envio Imediato no PIX
            </span>
          </div>
        </div>

        {/* Lado Esquerdo: Preço e Badge para Mobile */}
        <div className="sm:hidden flex flex-col shrink-0 min-w-0">
          <span className="text-[10px] text-[#2E7D32] font-bold flex items-center gap-1 leading-none mb-0.5">
            <Zap className="w-3 h-3 fill-[#2E7D32] shrink-0" />
            Envio Imediato
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif font-black text-xl text-[#2B1D12] leading-tight">
              R$ 19,90
            </span>
            <span className="text-[10px] text-[#6B533E] font-medium leading-none">
              (único)
            </span>
          </div>
        </div>

        {/* Lado Direito: Botão de Ação CTA Otimizado para Mobile Touch */}
        <button
          type="button"
          onClick={onOpenCheckout}
          id="btn-sticky-cta"
          className="min-h-[48px] py-3 px-4 sm:px-8 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-95 text-[#2B1D12] font-black text-xs min-[360px]:text-sm sm:text-base tracking-tight shadow-gold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ml-auto whitespace-nowrap group"
        >
          <Download className="w-4 h-4 text-[#2B1D12] shrink-0 group-hover:-translate-y-0.5 transition-transform" />
          <span className="whitespace-nowrap uppercase">GARANTIR POR R$ 19,90</span>
          <ArrowRight className="w-4 h-4 text-[#2B1D12] hidden min-[390px]:inline shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </aside>
  );
};
