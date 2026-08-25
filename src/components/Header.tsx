import React, { useState } from 'react';
import { Heart, Menu, X, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Versículos', href: '#versiculos' },
    { label: 'Demonstração', href: '#demonstracao' },
    { label: 'Bônus', href: '#bonus' },
    { label: 'Dúvidas', href: '#duvidas' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F2EBE3]/90 backdrop-blur-md border-b border-[#E8DFD5] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <a 
          href="#" 
          className="flex items-center gap-3 group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center shadow-sm text-[#C79801] group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-[#E1AD01] text-[#C79801]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-lg text-[#2B1D12] tracking-tight">
                Batata Mania
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E1AD01]/15 text-[#8A6700] font-semibold tracking-wide">
                OFICIAL
              </span>
            </div>
            <span className="text-xs text-[#6B533E] font-medium">
              Kit 365 Versículos para Delivery
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (No Buy Button in Header per instructions) */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4B3621] hover:text-[#C79801] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C79801] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#4B3621] hover:bg-[#FAF6F0] border border-[#E8DFD5] transition-colors"
            aria-label="Abrir menu"
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#E8DFD5] px-4 py-4 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#4B3621] hover:text-[#C79801] px-2 py-1.5 rounded-md hover:bg-[#F2EBE3] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
