import React from 'react';

interface FooterProps {
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onOpenCheckout?: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateHome,
}) => {
  const handleTermsClick = (e: React.MouseEvent) => {
    if (onNavigateToTerms) {
      e.preventDefault();
      onNavigateToTerms();
    }
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    if (onNavigateToPrivacy) {
      e.preventDefault();
      onNavigateToPrivacy();
    }
  };

  const handleHomeClick = (e: React.MouseEvent, hash?: string) => {
    if (onNavigateHome) {
      onNavigateHome();
    }
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (onNavigateHome) {
      e.preventDefault();
    }
  };

  return (
    <footer className="bg-[#2B1D12] text-[#D3C5B4] pt-12 pb-28 sm:py-14 px-5 sm:px-6 lg:px-8 border-t border-[#3B291A]">
      <div className="max-w-5xl mx-auto">
        {/* Top Row: Brand & Clean Navigation Columns */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-[#3B291A]">
          {/* Brand Wordmark */}
          <div className="space-y-2.5 max-w-xs">
            <a
              href="/"
              onClick={(e) => handleHomeClick(e)}
              className="inline-flex flex-col items-start leading-none group"
            >
              <span className="font-serif text-xl font-medium text-[#FAF6F0] tracking-tight">
                365 Versículos
              </span>
              <span className="text-[11px] text-[#A89887] tracking-wide mt-1">
                <span className="font-serif italic font-normal text-[#8C7A6B]">by</span>{' '}
                <span className="font-medium text-[#D3C5B4]">Batata Mania</span>
              </span>
            </a>
            <p className="text-xs text-[#A89887] leading-relaxed">
              Material digital pronto para impressão em A4 para estabelecimentos e delivery.
            </p>
          </div>

          {/* Standard Link Columns */}
          <div className="flex flex-wrap gap-10 sm:gap-14 text-xs">
            {/* Navegação */}
            <div className="space-y-2.5">
              <span className="font-sans font-semibold text-[#FAF6F0] block">
                Navegação
              </span>
              <ul className="space-y-2 text-[#A89887]">
                <li>
                  <a
                    href="#como-funciona"
                    onClick={(e) => handleHomeClick(e, '#como-funciona')}
                    className="hover:text-[#FAF6F0] transition-colors"
                  >
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a
                    href="#depoimentos"
                    onClick={(e) => handleHomeClick(e, '#depoimentos')}
                    className="hover:text-[#FAF6F0] transition-colors"
                  >
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a
                    href="#bonus"
                    onClick={(e) => handleHomeClick(e, '#bonus')}
                    className="hover:text-[#FAF6F0] transition-colors"
                  >
                    Bônus
                  </a>
                </li>
                <li>
                  <a
                    href="#duvidas"
                    onClick={(e) => handleHomeClick(e, '#duvidas')}
                    className="hover:text-[#FAF6F0] transition-colors"
                  >
                    Dúvidas
                  </a>
                </li>
              </ul>
            </div>

            {/* Institucional */}
            <div className="space-y-2.5">
              <span className="font-sans font-semibold text-[#FAF6F0] block">
                Institucional
              </span>
              <ul className="space-y-2 text-[#A89887]">
                <li>
                  <a
                    href="/termos-de-uso"
                    onClick={handleTermsClick}
                    className="hover:text-[#FAF6F0] transition-colors"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a
                    href="/privacidade"
                    onClick={handlePrivacyClick}
                    className="hover:text-[#FAF6F0] transition-colors"
                  >
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div className="space-y-2.5">
              <span className="font-sans font-semibold text-[#FAF6F0] block">
                Contato
              </span>
              <ul className="space-y-2 text-[#A89887]">
                <li>
                  <a
                    href="mailto:batatamaniacassi@gmail.com"
                    className="hover:text-[#FAF6F0] transition-colors"
                  >
                    batatamaniacassi@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5567981326047"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FAF6F0] transition-colors"
                  >
                    (67) 98132-6047
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8C7A6B] text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} Batata Mania. Todos os direitos reservados.
          </span>
          <span>CNPJ: 67.183.172/0001-19</span>
        </div>
      </div>
    </footer>
  );
};
