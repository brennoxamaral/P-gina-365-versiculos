import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Mail,
  Phone,
  MessageCircle,
  ArrowLeft,
  Clock,
  Building2,
  Sparkles,
  Printer,
  Ban,
  HelpCircle,
} from 'lucide-react';
import { LegalHeader } from '../components/LegalHeader';

interface TermsPageProps {
  onNavigateHome: () => void;
  onOpenCheckout?: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
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
        {/* Breadcrumb / Top Tag */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#8C7A6B] mb-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#C79801] transition-colors cursor-pointer"
          >
            Início
          </button>
          <span>/</span>
          <span className="text-[#C79801]">Termos de Uso</span>
        </div>

        {/* Page Headline */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[11px] sm:text-xs font-bold text-[#8A6700] shadow-xs max-w-full">
            <FileText className="w-3.5 h-3.5 text-[#C79801] shrink-0" />
            <span className="truncate sm:whitespace-normal">Documento Legal Oficial • Atualizado para 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#2B1D12] tracking-tight leading-tight break-words">
            Termos de Uso & Condições Gerais
          </h1>

          <p className="text-xs sm:text-base text-[#6B533E] max-w-2xl leading-relaxed">
            Transparência e segurança jurídica para o seu negócio gastronômico. Conheça as diretrizes de aquisição, licenciamento e suporte do <strong>Kit 365 Versículos para Delivery</strong>.
          </p>
        </div>

        {/* Quick Highlights Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center">
              <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#2B1D12]">
              Uso Comercial Liberado
            </h3>
            <p className="text-xs text-[#6B533E] leading-relaxed">
              Você tem total liberdade para imprimir ilimitadamente e enviar os bilhetes aos clientes do seu estabelecimento.
            </p>
          </div>

          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E1AD01]/15 text-[#8A6700] flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#C79801]" />
            </div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#2B1D12]">
              Acesso Vitalício & Imediato
            </h3>
            <p className="text-xs text-[#6B533E] leading-relaxed">
              Pagamento único sem mensalidades. O link para download do material em PDF e bônus é liberado logo após o PIX.
            </p>
          </div>

          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#2B1D12]">
              Garantia de 7 Dias
            </h3>
            <p className="text-xs text-[#6B533E] leading-relaxed">
              Satisfação incondicional ou 100% do seu dinheiro de volta direto pelo nosso suporte oficial, sem burocracia.
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
                Identificação do Titular e Objeto
              </h2>
            </div>
            <p className="text-[#6B533E]">
              O presente Termo de Uso e Condições de Venda regula a comercialização e utilização do produto digital <strong>Kit 365 Versículos para Delivery</strong>, disponibilizado pela <strong>Batata Mania</strong>, pessoa jurídica inscrita no CNPJ sob o nº <span className="font-bold text-[#2B1D12] bg-[#E8DFD5]/50 px-1.5 py-0.5 rounded text-xs sm:text-sm inline-block">67.183.172/0001-19</span>, com canais de atendimento no e-mail <a href="mailto:batatamaniacassi@gmail.com" className="text-[#C79801] font-semibold underline break-all">batatamaniacassi@gmail.com</a> e telefone/WhatsApp <a href="tel:+5567998659405" className="text-[#C79801] font-semibold underline whitespace-nowrap">(67) 99865-9405</a>.
            </p>
            <p className="text-[#6B533E]">
              Ao adquirir o Kit ou navegar neste site, você (doravante denominado <strong>"Usuário"</strong> ou <strong>"Comprador"</strong>) declara ter lido, compreendido e aceito integralmente estes termos.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                2
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                O Produto Digital e Materiais Entregues
              </h2>
            </div>
            <p className="text-[#6B533E]">
              O <strong>Kit 365 Versículos</strong> é um infoproduto 100% digital composto por:
            </p>
            <ul className="space-y-2 pl-1 sm:pl-2">
              <li className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5 sm:mt-1" />
                <span><strong>Arquivo PDF Principal:</strong> 365 versículos bíblicos de incentivo, paz e prosperidade diagramados com linhas de corte para folhas A4 (aproximadamente 30 a 32 páginas).</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5 sm:mt-1" />
                <span><strong>Bônus Exclusivo:</strong> Template editável de Cartão de Agradecimento Estratégico na plataforma Canva.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5 sm:mt-1" />
                <span><strong>Videoaula Prática:</strong> Guia de como personalizar, colocar logomarca e imprimir em qualquer impressora convencional.</span>
              </li>
            </ul>
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#F2EBE3] border border-[#E8DFD5] text-xs sm:text-sm text-[#6B533E] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#C79801] shrink-0 mt-0.5" />
              <span>
                <strong>Atenção:</strong> Nenhum produto físico ou impresso será enviado pelos Correios. A entrega é 100% digital via download e enviada ao e-mail informado no momento do checkout.
              </span>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                3
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Licença de Uso e Direitos Autorais
              </h2>
            </div>
            <p className="text-[#6B533E]">
              A compra do Kit concede ao Comprador uma <strong>licença de uso não exclusiva e vitalícia</strong> para:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#2E7D32]/5 border border-[#2E7D32]/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E7D32]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> PERMITIDO (Autorizado)
                </div>
                <p className="text-xs text-[#4B3621]">
                  Imprimir cópias ilimitadas para anexar aos pedidos do seu delivery, lanchonete, restaurante ou comércio, fidelizando seus clientes finais.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#D32F2F]/5 border border-[#D32F2F]/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D32F2F]">
                  <Ban className="w-4 h-4 shrink-0" /> ESTRITAMENTE PROIBIDO
                </div>
                <p className="text-xs text-[#4B3621]">
                  Revender, compartilhar, repassar em grupos, ratear ou distribuir os arquivos digitais (PDF ou links) na internet sob pena de violação da Lei de Direitos Autorais (Lei nº 9.610/98).
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                4
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Preço, Pagamento e Envio Imediato
              </h2>
            </div>
            <p className="text-[#6B533E]">
              O valor da oferta atual é de <strong>R$ 19,90 em pagamento único</strong>, sem mensalidades ou taxas ocultas.
            </p>
            <p className="text-[#6B533E]">
              Os pagamentos são processados com tecnologia de criptografia de ponta a ponta através da integradora <strong>AbacatePay</strong>, instituição autorizada pelo Banco Central do Brasil.
            </p>
            <p className="text-[#6B533E]">
              Após a confirmação da transação PIX (que ocorre em menos de 10 segundos), o Comprador é automaticamente direcionado para a tela de download imediato e recebe uma cópia integral dos materiais no seu e-mail cadastrado.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                5
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Garantia Incondicional de 7 Dias (Código de Defesa do Consumidor)
              </h2>
            </div>
            <p className="text-[#6B533E]">
              Em total respeito ao <strong>Artigo 49 do Código de Defesa do Consumidor (Lei nº 8.078/90)</strong> e prezando pela máxima satisfação de nossos parceiros comerciais, oferecemos uma <strong>Garantia Incondicional de 7 (sete) dias corridos</strong> a contar da data de confirmação do pagamento.
            </p>
            <p className="text-[#6B533E]">
              Caso o material não atenda às suas expectativas, basta enviar uma mensagem para o nosso e-mail <a href="mailto:batatamaniacassi@gmail.com" className="text-[#C79801] font-semibold underline break-all">batatamaniacassi@gmail.com</a> ou acionar o WhatsApp de suporte <a href="https://wa.me/5567998659405" target="_blank" rel="noopener noreferrer" className="text-[#C79801] font-semibold underline whitespace-nowrap">(67) 99865-9405</a> informando o e-mail ou comprovante da compra, e devolveremos 100% do valor pago via PIX, sem questionamentos ou burocracia.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                6
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Isenção de Responsabilidade e Resultados Comerciais
              </h2>
            </div>
            <p className="text-[#6B533E]">
              O Kit 365 Versículos é uma ferramenta prática de carinho, conexão humana e fidelização de clientes. Os resultados práticos de aumento de vendas ou retenção dependem exclusivamente da qualidade geral dos alimentos, atendimento, pontualidade de entrega e gestão individual de cada estabelecimento comercial.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5 sm:gap-3 text-[#C79801]">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E1AD01]/15 flex items-center justify-center font-bold text-xs text-[#8A6700] shrink-0 mt-0.5 sm:mt-0">
                7
              </span>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#2B1D12] leading-snug">
                Legislação Vigente e Foro
              </h2>
            </div>
            <p className="text-[#6B533E]">
              Estes Termos de Uso são regidos e interpretados de acordo com as Leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de domicílio do consumidor ou sede da empresa para dirimir eventuais controvérsias decorrentes deste contrato.
            </p>
          </section>
        </div>

        {/* Support & Contact Card */}
        <div className="mt-8 sm:mt-10 bg-[#FAF6F0] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8DFD5] shadow-xs space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#E8DFD5] pb-4 sm:pb-5">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2B1D12]">
                Canais de Atendimento & Suporte
              </h3>
              <p className="text-xs text-[#6B533E] mt-0.5 sm:mt-1">
                Ficou com alguma dúvida sobre estes termos ou precisa de assistência?
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
                    E-mail Oficial
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
                    WhatsApp Comercial
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#2B1D12] block truncate">
                    (67) 99865-9405
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/5567998659405?text=Ol%C3%A1%2C+estou+com+uma+d%C3%BAvida+sobre+os+Termos+de+Uso+do+Kit+365+Vers%C3%ADculos"
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
