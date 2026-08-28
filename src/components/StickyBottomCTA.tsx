import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface StickyBottomCTAProps {
  onOpenCheckout: () => void;
}

export const StickyBottomCTA: React.FC<StickyBottomCTAProps> = ({ onOpenCheckout }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      // Exibir APENAS depois que o usuário ultrapassar o botão principal na seção Hero
      const heroBtns = Array.from(document.querySelectorAll<HTMLElement>('#btn-hero-cta, #btn-hero-cta-desktop'));
      const visibleHeroBtn = heroBtns.find(btn => btn.offsetWidth > 0 || btn.offsetHeight > 0);
      if (visibleHeroBtn) {
        const rect = visibleHeroBtn.getBoundingClientRect();
        // Visível somente se a borda inferior do botão do Hero já passou do topo da janela
        setVisible(rect.bottom < 0);
      } else {
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
          const rect = heroSection.getBoundingClientRect();
          setVisible(rect.bottom < 0);
        } else {
          setVisible(window.scrollY > 800);
        }
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Aviso de compra rápida"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E8DFD5] pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] px-4 shadow-craft-lg animate-fadeIn"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Product and Price label */}
        <div className="hidden sm:flex flex-col">
          <span className="font-serif font-bold text-sm text-[#2B1D12]">
            Kit 365 Versículos para Delivery + Bônus Canva
          </span>
          <div className="flex items-center gap-2 text-xs text-[#6B533E]">
            <span className="line-through text-[#8C7A6B]">R$ 47,00</span>
            <span className="font-extrabold text-[#2B1D12] text-sm">Por R$ 19,90</span>
            <span className="text-[#2E7D32] font-semibold flex items-center gap-0.5">
              <Zap className="w-3 h-3" /> Envio Imediato
            </span>
          </div>
        </div>

        {/* Price on mobile */}
        <div className="sm:hidden flex flex-col shrink-0">
          <span className="text-[10px] text-[#6B533E] font-medium leading-none mb-0.5">Pagamento único</span>
          <span className="font-serif font-black text-lg text-[#2B1D12] leading-tight">R$ 19,90</span>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onOpenCheckout}
          id="btn-sticky-cta"
          className="min-h-[44px] py-2.5 px-3.5 sm:px-7 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-95 text-[#2B1D12] font-extrabold text-xs sm:text-base tracking-tight shadow-gold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ml-auto whitespace-nowrap"
        >
          <Download className="w-4 h-4 text-[#2B1D12] shrink-0" />
          <span className="whitespace-nowrap">GARANTIR POR R$ 19,90</span>
          <ArrowRight className="w-4 h-4 text-[#2B1D12] hidden sm:inline shrink-0" />
        </button>

      </div>
    </aside>
  );
};
