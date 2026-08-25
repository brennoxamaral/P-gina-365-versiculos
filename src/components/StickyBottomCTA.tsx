import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface StickyBottomCTAProps {
  onOpenCheckout: () => void;
}

export const StickyBottomCTA: React.FC<StickyBottomCTAProps> = ({ onOpenCheckout }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 450px
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="Aviso de compra rápida" className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E8DFD5] py-3 px-4 shadow-craft-lg animate-fadeIn">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        
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
        <div className="sm:hidden flex flex-col">
          <span className="text-[10px] text-[#6B533E] font-medium">Pagamento único</span>
          <span className="font-serif font-black text-lg text-[#2B1D12] leading-none">R$ 19,90</span>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onOpenCheckout}
          id="btn-sticky-cta"
          className="py-2.5 px-5 sm:px-7 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-95 text-[#2B1D12] font-extrabold text-sm sm:text-base tracking-tight shadow-gold transition-all flex items-center gap-2 cursor-pointer ml-auto"
        >
          <Download className="w-4 h-4 text-[#2B1D12]" />
          <span>GARANTIR POR R$ 19,90</span>
          <ArrowRight className="w-4 h-4 text-[#2B1D12] hidden sm:inline" />
        </button>

      </div>
    </aside>
  );
};
