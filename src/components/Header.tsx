import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';

interface HeaderProps {
  onOpenCheckout?: () => void;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCheckout,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Bônus', href: '#bonus' },
    { label: 'Dúvidas', href: '#duvidas' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    if (onNavigateHome) {
      onNavigateHome();
    }
    // Allow smooth scroll to anchor
    const targetElement = document.querySelector(href);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative w-full bg-[#F2EBE3] border-b border-[#E8DFD5] transition-all duration-300">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Wordmark Structured */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="inline-flex flex-col items-start justify-center leading-none group shrink-0"
          id="nav-logo"
        >
          <span className="font-serif text-xl sm:text-[22px] font-medium text-[#2B1D12] tracking-tight group-hover:text-[#4B3621] transition-colors">
            365 Versículos
          </span>
          <span className="text-[11px] text-[#6B533E] tracking-wide mt-1">
            <span className="font-serif italic font-normal text-[#8C7A6B]">by</span>{' '}
            <span className="font-medium text-[#4B3621]">Batata Mania</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="text-sm font-medium text-[#4B3621] hover:text-[#2B1D12] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C79801] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header CTA Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          {/* Desktop & Tablet CTA Button */}
          <button
            type="button"
            onClick={onOpenCheckout}
            id="btn-header-cta"
            className="hidden sm:inline-flex items-center gap-2 py-2.5 px-4 md:px-5 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-98 text-[#2B1D12] font-semibold text-xs md:text-sm tracking-tight uppercase shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-[#2B1D12] shrink-0" />
            <span>Quero o meu PDF</span>
          </button>

          {/* Mobile menu trigger */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-[#4B3621] hover:bg-[#FAF6F0] border border-[#E8DFD5] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Abrir menu"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6F0] border-b border-[#E8DFD5] px-5 py-4 space-y-2.5 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavLinkClick(e, link.href);
              }}
              className="block text-base font-medium text-[#4B3621] hover:text-[#2B1D12] px-2 py-1.5 rounded-lg hover:bg-[#F2EBE3] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2.5 border-t border-[#E8DFD5]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout?.();
              }}
              id="btn-mobile-header-cta"
              className="w-full py-3 px-4 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-98 text-[#2B1D12] font-semibold text-sm tracking-tight shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#2B1D12] shrink-0" />
              <span>Quero o meu PDF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
