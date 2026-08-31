import React from 'react';
import { ArrowLeft, Heart, ShieldCheck, Download } from 'lucide-react';

interface LegalHeaderProps {
  onNavigateHome: () => void;
  onOpenCheckout?: () => void;
}

export const LegalHeader: React.FC<LegalHeaderProps> = ({
  onNavigateHome,
  onOpenCheckout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F2EBE3]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Back to Home + Logo */}
        <div className="flex items-center gap-2 sm:gap-5 min-w-0">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-xl bg-[#FAF6F0] hover:bg-[#E8DFD5]/60 text-[#4B3621] font-semibold text-xs sm:text-sm border border-[#E8DFD5] transition-all hover:scale-102 active:scale-98 cursor-pointer shadow-xs shrink-0"
            aria-label="Voltar para a página principal"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C79801]" />
            <span className="hidden sm:inline">Voltar ao Início</span>
            <span className="sm:hidden text-xs font-bold">Início</span>
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer text-left min-w-0"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center shadow-xs text-[#C79801] group-hover:scale-105 transition-transform shrink-0">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#E1AD01] text-[#C79801]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-sm sm:text-lg text-[#2B1D12] tracking-tight truncate">
                  Batata Mania
                </span>
                <span className="hidden min-[480px]:inline-flex text-[10px] px-1.5 py-0.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] font-bold items-center gap-0.5 shrink-0">
                  <ShieldCheck className="w-3 h-3" />
                  OFICIAL
                </span>
              </div>
              <span className="text-[11px] text-[#6B533E] font-medium hidden md:inline truncate">
                Portal de Transparência & Legalidade
              </span>
            </div>
          </button>
        </div>

        {/* Right: Quick CTA */}
        {onOpenCheckout && (
          <button
            type="button"
            onClick={onOpenCheckout}
            className="inline-flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2.5 px-3 sm:px-5 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-95 text-[#2B1D12] font-bold text-xs sm:text-sm tracking-tight shadow-gold hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2B1D12] shrink-0" />
            <span className="hidden min-[380px]:inline">Adquirir • </span>
            <span>R$ 19,90</span>
          </button>
        )}
      </div>
    </header>
  );
};
