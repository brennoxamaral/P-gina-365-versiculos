import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  UserCheck,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Phone,
  MessageCircle,
  ArrowLeft,
  Building2,
  KeyRound,
  FileCheck2,
} from 'lucide-react';
import { LegalHeader } from '../components/LegalHeader';

interface PrivacyPageProps {
  onNavigateHome: () => void;
  onOpenCheckout?: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  onNavigateHome,
  onOpenCheckout,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('batatamaniacassi@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('(67) 99865-9405');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F2EBE3] text-[#4B3621] flex flex-col selection:bg-[#E1AD01]/30 selection:text-[#2B1D12]">
      {/* Header Institucional */}
      <LegalHeader
        onNavigateHome={onNavigateHome}
        onOpenCheckout={onOpenCheckout}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-16">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#8C7A6B] mb-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#C79801] transition-colors cursor-pointer"
          >
            Início
          </button>
          <span>/</span>
          <span className="text-[#C79801]">Política de Privacidade</span>
        </div>

        {/* Page Headline */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[11px] sm:text-xs font-bold text-[#2E7D32] shadow-xs max-w-full">
            <Shield className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
            <span className="truncate sm:whitespace-normal">Conformidade LGPD • Lei Federal nº 13.709/2018</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#2B1D12] tracking-tight leading-tight break-words">
            Política de Privacidade & Proteção de Dados
          </h1>

          <p className="text-xs sm:text-base text-[#6B533E] max-w-2xl leading-relaxed">
            Seus dados pessoais são tratados com o mais alto rigor de segurança e transparência. Conheça como protegemos suas informações ao adquirir o <strong>Kit 365 Versículos</strong>.
          </p>
        </div>

        {/* Quick Highlights Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center">
              <Database className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#2B1D12]">
              Coleta Mínima & Estrita
            </h3>
            <p className="text-xs text-[#6B533E] leading-relaxed">
              Coletamos estritamente os dados necessários para gerar o PIX oficial e enviar os arquivos para o seu e-mail.
            </p>
          </div>

          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E1AD01]/15 text-[#8A6700] flex items-center justify-center">
              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-[#C79801]" />
            </div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#2B1D12]">
              Zero Venda de Dados
            </h3>
            <p className="text-xs text-[#6B533E] leading-relaxed">
              Jamais comercializamos, alugamos ou repassamos suas informações a terceiros ou empresas de publicidade.
            </p>
          </div>

          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#2B1D12]">
              Segurança SSL 256 bits
            </h3>
            <p className="text-xs text-[#6B533E] leading-relaxed">
              Ambiente 100% criptografado com certificação de segurança bancária via gateway AbacatePay.
            </p>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="bg-[#FAF6F0] p-4 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#E8DFD5] shadow-craft space-y-8 sm:space-y-10 text-xs sm:text-base leading-relaxed text-[#4B3621]">
          {/* Section 1 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                1
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Controlador de Dados e Informações Corporativas
              </h2>
            </div>
            <p className="text-[#6B533E]">
              A entidade controladora responsável pelas operações de tratamento de dados pessoais realizadas através desta plataforma é a <strong>Batata Mania</strong>, pessoa jurídica inscrita no CNPJ/MF sob o nº <span className="font-bold text-[#2B1D12] bg-[#E8DFD5]/50 px-1.5 py-0.5 rounded text-xs sm:text-sm inline-block">67.183.172/0001-19</span>.
            </p>
            <p className="text-[#6B533E]">
              Para assuntos relacionados à privacidade e exercício de direitos da LGPD, disponibilizamos o canal oficial do Encarregado de Dados (DPO) através do e-mail: <a href="mailto:batatamaniacassi@gmail.com" className="text-[#C79801] font-semibold underline break-all">batatamaniacassi@gmail.com</a> ou pelo telefone <a href="tel:+5567998659405" className="text-[#C79801] font-semibold underline whitespace-nowrap">(67) 99865-9405</a>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                2
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Quais Dados Coletamos e Suas Finalidades
              </h2>
            </div>
            <p className="text-[#6B533E]">
              Em respeito ao princípio da necessidade da LGPD (Art. 6º, III), solicitamos apenas as informações indispensáveis para a concretização da compra:
            </p>
            <div className="space-y-2 sm:space-y-2.5 pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#F2EBE3] border border-[#E8DFD5] flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-[#2B1D12]">Nome Completo:</strong> Identificação do titular do pedido e personalização das comunicações de entrega.
                </div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#F2EBE3] border border-[#E8DFD5] flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-[#2B1D12]">E-mail:</strong> Envio imediato dos links de download do Kit em PDF, bônus do Canva, comprovante de pagamento e comunicação de suporte pós-venda.
                </div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#F2EBE3] border border-[#E8DFD5] flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-[#2B1D12]">CPF / CNPJ:</strong> Exigência regulatória do Banco Central do Brasil para emissão do QR Code dinâmico do PIX e prevenção a fraudes financeiras.
                </div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#F2EBE3] border border-[#E8DFD5] flex items-start gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-[#2B1D12]">Telefone / Celular:</strong> Canal alternativo de envio do comprovante ou assistência em caso de instabilidade na entrega do e-mail.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                3
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Processamento Financeiro e Compartilhamento
              </h2>
            </div>
            <p className="text-[#6B533E]">
              O processamento do pagamento via PIX é executado diretamente pela plataforma <strong>AbacatePay</strong>, instituição financeira e de tecnologia de pagamentos em conformidade com as diretrizes do Banco Central do Brasil.
            </p>
            <p className="text-[#6B533E]">
              A Batata Mania <strong>não armazena nem tem acesso</strong> a dados bancários sensíveis ou senhas. Os dados cadastrais são compartilhados exclusivamente com nossos provedores de infraestrutura essenciais (gateway de pagamento e servidor de envio de e-mails transacionais).
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                4
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Seus Direitos como Titular dos Dados (Art. 18 da LGPD)
              </h2>
            </div>
            <p className="text-[#6B533E]">
              Você possui total controle sobre seus dados pessoais e pode, a qualquer momento e sem custos, solicitar:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2B1D12]">
                  <FileCheck2 className="w-4 h-4 text-[#C79801] shrink-0" /> Confirmação & Acesso
                </div>
                <p className="text-xs text-[#6B533E]">
                  Saber quais dados mantemos sobre você em nossos registros de compra.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E7D32]">
                  <UserCheck className="w-4 h-4 text-[#2E7D32] shrink-0" /> Correção & Atualização
                </div>
                <p className="text-xs text-[#6B533E]">
                  Corrigir dados incompletos, inexatos ou desatualizados do seu cadastro.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C79801]">
                  <ShieldCheck className="w-4 h-4 text-[#C79801] shrink-0" /> Eliminação de Dados
                </div>
                <p className="text-xs text-[#6B533E]">
                  Solicitar a exclusão dos seus dados cadastrais após a expiração dos prazos legais de guarda fiscal.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E7D32]">
                  <KeyRound className="w-4 h-4 text-[#2E7D32] shrink-0" /> Revogação de Consentimento
                </div>
                <p className="text-xs text-[#6B533E]">
                  Cancelar comunicações opcionais a qualquer instante com um simples clique.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                5
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Cookies e Tecnologias de Navegação
              </h2>
            </div>
            <p className="text-[#6B533E]">
              Utilizamos cookies estritamente técnicos para garantir o funcionamento correto do carrinho de checkout e medir o desempenho agregado e anônimo da página, garantindo carregamento ultrarrápido em dispositivos móveis e desktops.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                6
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Segurança da Informação e Padrões Técnicos
              </h2>
            </div>
            <p className="text-[#6B533E]">
              Adotamos medidas técnicas e organizacionais de segurança para proteger seus dados contra acessos não autorizados, perdas ou alterações ilícitas, incluindo protocolo SSL/TLS com criptografia de 256 bits em todas as requisições.
            </p>
          </section>
        </div>

        {/* Support & DPO Contact Card */}
        <div className="mt-8 sm:mt-10 bg-[#FAF6F0] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8DFD5] shadow-xs space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#E8DFD5] pb-4 sm:pb-5">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2B1D12]">
                Canal de Atendimento ao Titular (LGPD)
              </h3>
              <p className="text-xs text-[#6B533E] mt-0.5 sm:mt-1">
                Para exercer seus direitos de privacidade ou esclarecer dúvidas sobre seus dados:
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C7A6B] bg-[#F2EBE3] sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-lg sm:rounded-none w-fit">
              <Building2 className="w-4 h-4 text-[#C79801] shrink-0" />
              <span>CNPJ: 67.183.172/0001-19</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Email Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F2EBE3] border border-[#E8DFD5] flex items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C79801] shrink-0 shadow-xs">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="truncate min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase text-[#8C7A6B] block">
                    Encarregado (DPO)
                  </span>
                  <a
                    href="mailto:batatamaniacassi@gmail.com"
                    className="text-xs sm:text-sm font-bold text-[#2B1D12] hover:text-[#C79801] truncate block"
                  >
                    batatamaniacassi@gmail.com
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 sm:p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#E1AD01] text-[#4B3621] hover:text-[#2B1D12] border border-[#E8DFD5] transition-all cursor-pointer shrink-0"
                title="Copiar e-mail"
                aria-label="Copiar e-mail"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-[#2E7D32]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Telefone Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F2EBE3] border border-[#E8DFD5] flex items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#C79801] shrink-0 shadow-xs">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="truncate min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase text-[#8C7A6B] block">
                    Telefone de Contato
                  </span>
                  <a
                    href="tel:+5567998659405"
                    className="text-xs sm:text-sm font-bold text-[#2B1D12] hover:text-[#C79801] truncate block"
                  >
                    (67) 99865-9405
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="p-2 sm:p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#E1AD01] text-[#4B3621] hover:text-[#2B1D12] border border-[#E8DFD5] transition-all cursor-pointer shrink-0"
                title="Copiar telefone"
                aria-label="Copiar telefone"
              >
                {copiedPhone ? (
                  <Check className="w-4 h-4 text-[#2E7D32]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* WhatsApp Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F2EBE3] border border-[#E8DFD5] flex items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32] shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase text-[#8C7A6B] block">
                    WhatsApp de Suporte
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#2B1D12] block truncate">
                    (67) 99865-9405
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/5567998659405?text=Ol%C3%A1%2C+estou+com+uma+d%C3%BAvida+sobre+a+Pol%C3%ADtica+de+Privacidade+do+Kit+365+Vers%C3%ADculos"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 sm:px-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#256829] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer text-center"
              >
                Conversar
              </a>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FAF6F0] sm:bg-transparent border border-[#E8DFD5] sm:border-transparent text-xs sm:text-sm font-bold text-[#4B3621] hover:text-[#C79801] transition-colors cursor-pointer w-full sm:w-auto min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para a Página Inicial</span>
            </button>

            {onOpenCheckout && (
              <button
                type="button"
                onClick={onOpenCheckout}
                className="inline-flex items-center justify-center gap-2 py-3 sm:py-2.5 px-5 sm:px-4 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] text-[#2B1D12] text-xs sm:text-sm font-bold transition-all shadow-gold cursor-pointer w-full sm:w-auto min-h-[44px]"
              >
                <span>Quero Garantir Meu Kit • R$ 19,90</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
