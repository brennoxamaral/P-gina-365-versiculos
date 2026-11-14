import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

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
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Back to Home + Logo */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl bg-[#FAF6F0] hover:bg-[#E8DFD5]/60 text-[#4B3621] font-medium text-xs sm:text-sm border border-[#E8DFD5] transition-all active:scale-98 cursor-pointer shadow-xs shrink-0"
            aria-label="Voltar para a página principal"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C79801]" />
            <span className="hidden sm:inline">Voltar ao Início</span>
            <span className="sm:hidden text-xs font-medium">Início</span>
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex flex-col items-start justify-center leading-none group cursor-pointer text-left min-w-0"
          >
            <span className="font-serif text-lg sm:text-xl font-medium text-[#2B1D12] tracking-tight truncate">
              365 Versículos
            </span>
            <span className="text-[11px] text-[#6B533E] tracking-wide mt-0.5 truncate">
              <span className="font-serif italic font-normal text-[#8C7A6B]">by</span>{' '}
              <span className="font-medium text-[#4B3621]">Batata Mania</span>
            </span>
          </button>
        </div>

        {/* Right: Quick CTA */}
        {onOpenCheckout && (
          <button
            type="button"
            onClick={onOpenCheckout}
            className="inline-flex items-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-98 text-[#2B1D12] font-semibold text-xs sm:text-sm tracking-tight shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
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
