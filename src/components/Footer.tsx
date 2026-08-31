import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Shield,
  Building2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onOpenCheckout?: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToTerms,
  onNavigateToPrivacy,
  onOpenCheckout,
  onNavigateHome,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('batatamaniacassi@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('(67) 99865-9405');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

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

  const handleHomeClick = (e: React.MouseEvent) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    }
  };

  return (
    <footer className="bg-[#2B1D12] text-[#D3C5B4] pt-16 pb-32 sm:pb-16 px-4 sm:px-6 lg:px-8 border-t border-[#3B291A]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Grid: 4 Pillars of Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#3B291A]">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 lg:pr-4">
            <button
              type="button"
              onClick={handleHomeClick}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C79801] shadow-xs group-hover:scale-105 transition-transform">
                <Heart className="w-4 h-4 fill-[#E1AD01] text-[#C79801]" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white block">
                  Batata Mania
                </span>
                <span className="text-[11px] text-[#C79801] font-semibold tracking-wide uppercase">
                  Kit 365 Versículos
                </span>
              </div>
            </button>

            <p className="text-xs text-[#A89887] leading-relaxed">
              Transformando a experiência do seu delivery com palavras de carinho, fé e esperança que fidelizam clientes e marcam corações todos os dias.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3B291A] text-[#E1AD01] text-xs font-semibold border border-[#4B3621]">
                <Sparkles className="w-3.5 h-3.5" /> Acesso Imediato & Vitalício
              </span>
            </div>
          </div>

          {/* Col 2: Meios de Contato (Email, Telefone & WhatsApp) */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Atendimento & Suporte
            </h4>
            <p className="text-xs text-[#A89887]">
              Dúvidas sobre o material ou suporte pós-compra? Fale com a gente:
            </p>

            <div className="space-y-2.5">
              {/* E-mail */}
              <div className="p-2.5 rounded-xl bg-[#3B291A]/80 border border-[#4B3621] flex items-center justify-between gap-2 group hover:border-[#C79801]/40 transition-colors">
                <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF6F0]/10 flex items-center justify-center text-[#E1AD01] shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate min-w-0">
                    <span className="text-[10px] text-[#A89887] block font-medium">
                      E-mail de Suporte
                    </span>
                    <a
                      href="mailto:batatamaniacassi@gmail.com"
                      className="text-xs font-semibold text-[#F2EBE3] hover:text-[#E1AD01] truncate block transition-colors"
                      title="Enviar e-mail"
                    >
                      batatamaniacassi@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-[#2B1D12] hover:bg-[#E1AD01] text-[#D3C5B4] hover:text-[#2B1D12] transition-colors cursor-pointer shrink-0 border border-[#4B3621]"
                  title="Copiar e-mail"
                  aria-label="Copiar endereço de e-mail"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Telefone */}
              <div className="p-2.5 rounded-xl bg-[#3B291A]/80 border border-[#4B3621] flex items-center justify-between gap-2 group hover:border-[#C79801]/40 transition-colors">
                <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF6F0]/10 flex items-center justify-center text-[#E1AD01] shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate min-w-0">
                    <span className="text-[10px] text-[#A89887] block font-medium">
                      Telefone de Contato
                    </span>
                    <a
                      href="tel:+5567998659405"
                      className="text-xs font-semibold text-[#F2EBE3] hover:text-[#E1AD01] truncate block transition-colors"
                      title="Ligar para suporte"
                    >
                      (67) 99865-9405
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="p-1.5 rounded-lg bg-[#2B1D12] hover:bg-[#E1AD01] text-[#D3C5B4] hover:text-[#2B1D12] transition-colors cursor-pointer shrink-0 border border-[#4B3621]"
                  title="Copiar telefone"
                  aria-label="Copiar número de telefone"
                >
                  {copiedPhone ? (
                    <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/5567998659405?text=Ol%C3%A1%2C+preciso+de+ajuda+com+o+Kit+365+Vers%C3%ADculos"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#2E7D32]/20 hover:bg-[#2E7D32]/30 border border-[#2E7D32]/40 flex items-center justify-between gap-2 group transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#2E7D32] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 truncate">
                    <span className="text-[10px] text-[#81C784] block font-medium">
                      WhatsApp Oficial
                    </span>
                    <span className="text-xs font-semibold text-white truncate block">
                      (67) 99865-9405
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#81C784] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>
            </div>
          </div>

          {/* Col 3: Links Rápidos & Subpáginas */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Navegação & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/#como-funciona"
                  onClick={handleHomeClick}
                  className="text-[#D3C5B4] hover:text-[#E1AD01] transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <span>•</span> Como Funciona o Kit
                </a>
              </li>
              <li>
                <a
                  href="/#versiculos"
                  onClick={handleHomeClick}
                  className="text-[#D3C5B4] hover:text-[#E1AD01] transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <span>•</span> Exemplos de Versículos
                </a>
              </li>
              <li>
                <a
                  href="/#bonus"
                  onClick={handleHomeClick}
                  className="text-[#D3C5B4] hover:text-[#E1AD01] transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <span>•</span> Bônus Cartão Canva
                </a>
              </li>
              <li>
                <a
                  href="/#duvidas"
                  onClick={handleHomeClick}
                  className="text-[#D3C5B4] hover:text-[#E1AD01] transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <span>•</span> Perguntas Frequentes (FAQ)
                </a>
              </li>
              <li className="pt-1.5 border-t border-[#3B291A]">
                <a
                  href="/termos-de-uso"
                  onClick={handleTermsClick}
                  className="text-[#F2EBE3] hover:text-[#E1AD01] font-semibold transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C79801]" />
                  <span>Termos de Uso</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacidade"
                  onClick={handlePrivacyClick}
                  className="text-[#F2EBE3] hover:text-[#E1AD01] font-semibold transition-colors flex items-center gap-1.5 py-0.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Política de Privacidade (LGPD)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Garantia & Segurança */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Segurança & Garantia
            </h4>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#3B291A]/60 border border-[#4B3621] space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E1AD01]">
                  <Lock className="w-3.5 h-3.5 text-[#E1AD01]" />
                  <span>Ambiente Seguro SSL 256 bits</span>
                </div>
                <p className="text-[11px] text-[#A89887] leading-tight">
                  Seus dados e pagamentos são protegidos com criptografia de padrão bancário.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#2E7D32]/10 border border-[#2E7D32]/30 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#81C784]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Garantia de 7 Dias (CDC)</span>
                </div>
                <p className="text-[11px] text-[#A89887] leading-tight">
                  Satisfação total ou 100% de reembolso sem burocracia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate / Fiscal Info (CNPJ Box) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#3B291A]/50 border border-[#4B3621] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FAF6F0]/10 flex items-center justify-center text-[#E1AD01] shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Batata Mania • Identificação Fiscal
              </span>
              <span className="text-xs text-[#D3C5B4]">
                CNPJ: <strong className="text-white tracking-wider">67.183.172/0001-19</strong>
              </span>
            </div>
          </div>

          <div className="text-xs text-[#A89887] max-w-md">
            Produto 100% digital em conformidade com o Código de Defesa do Consumidor e a Lei Geral de Proteção de Dados (LGPD).
          </div>
        </div>

        {/* Disclaimer / Legal Note */}
        <p className="text-[11px] text-[#8C7A6B] text-center max-w-3xl mx-auto leading-relaxed">
          Este produto digital é comercializado para fins de capacitação, encantamento e fidelização de clientes em estabelecimentos gastronômicos e de delivery. Os resultados práticos podem variar de acordo com o segmento, atendimento e qualidade de cada estabelecimento.
        </p>

        {/* Copyright Bar */}
        <div className="pt-6 border-t border-[#3B291A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A6B] gap-3 text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} Batata Mania. Todos os direitos reservados.
          </span>
          <span className="text-[11px] text-[#A89887]">
            Feito com fé e dedicação para transformar o seu delivery.
          </span>
        </div>
      </div>
    </footer>
  );
};
