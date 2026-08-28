import React from 'react';
import { Check, ShieldCheck, Zap, Lock, ArrowRight, Download, Sparkles, Star, Gift, Clock } from 'lucide-react';

interface PricingBoxProps {
  onOpenCheckout: () => void;
}

export const PricingBox: React.FC<PricingBoxProps> = ({ onOpenCheckout }) => {
  const inclusions = [
    { text: 'Kit Completo com 365 Versículos Bíblicos em PDF de Alta Resolução', highlight: true },
    { text: 'Diagramação A4 com Guias Pontilhadas para Corte Rápido', highlight: true },
    { text: 'BÔNUS: Template Oficial do Cartão de Agradecimento com QR Code no Canva', highlight: true },
    { text: 'BÔNUS: Videoaula Passo a Passo de Edição e Impressão', highlight: false },
    { text: 'Guia de Papéis Recomendados (Sulfite, Kraft, Color Plus)', highlight: false },
    { text: 'Acesso Vitalício + Atualizações Futuras Gratuitas', highlight: false },
    { text: 'Garantia Incondicional de 7 Dias ou seu Dinheiro de Volta', highlight: false },
  ];

  return (
    <section id="oferta" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#F2EBE3]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Top Urgency / Condition Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E1AD01]/20 border border-[#C79801]/30 text-xs sm:text-sm font-bold text-[#8A6700] mb-6">
          <Clock className="w-4 h-4 text-[#C79801]" />
          <span>OFERTA ESPECIAL DE LANÇAMENTO • PAGAMENTO ÚNICO</span>
        </div>

        {/* Pricing Card (Highlighted with mustard gold border & craft elegance) */}
        <div className="w-full max-w-2xl bg-[#FAF6F0] rounded-3xl border-3 border-[#E1AD01] p-6 sm:p-10 shadow-craft-lg relative text-center">
          
          {/* Top Ribbons */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2B1D12] text-[#E1AD01] text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            ACESSO IMEDIATO & VITALÍCIO
          </div>

          <div className="mt-4 mb-6">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2B1D12]">
              Kit 365 Versículos para Delivery
            </h3>
            <p className="text-sm text-[#5A422D] mt-1 font-medium">
              O investimento que se paga no primeiro cliente fidelizado.
            </p>
          </div>

          {/* Pricing Numbers */}
          <div className="my-6 p-5 rounded-2xl bg-[#F2EBE3] border border-[#E8DFD5] inline-flex flex-col items-center justify-center w-full">
            <div className="text-xs text-[#6B533E] font-semibold line-through">
              De R$ 47,00 por apenas
            </div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-xl sm:text-2xl font-bold text-[#2B1D12]">R$</span>
              <span className="font-serif text-5xl sm:text-6xl font-black text-[#2B1D12] tracking-tight">
                19<span className="text-3xl sm:text-4xl">,90</span>
              </span>
            </div>
            <span className="text-xs font-bold text-[#2E7D32] bg-[#2E7D32]/10 px-3 py-1 rounded-full">
              PAGAMENTO ÚNICO • SEM MENSALIDADES
            </span>
          </div>

          {/* Inclusions List */}
          <div className="space-y-3 text-left mb-8 max-w-lg mx-auto">
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className={`leading-tight ${item.highlight ? 'font-bold text-[#2B1D12]' : 'text-[#5A422D]'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Big Direct Buy CTA Button */}
          <div className="space-y-3 max-w-md mx-auto">
            <button
              type="button"
              onClick={onOpenCheckout}
              id="btn-pricing-cta"
              className="w-full py-3.5 sm:py-4 px-3 sm:px-8 rounded-2xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-98 text-[#2B1D12] font-extrabold text-xs min-[360px]:text-sm sm:text-base md:text-lg lg:text-xl tracking-tight shadow-gold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 cursor-pointer group whitespace-nowrap"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#2B1D12] shrink-0 group-hover:-translate-y-0.5 transition-transform" />
              <span className="whitespace-nowrap">COMPRAR AGORA • R$ 19,90</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#2B1D12] shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Payment security badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-[#6B533E] font-medium pt-1">
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#C79801]" /> PIX com Liberação Instantânea
              </span>
              <span className="hidden min-[400px]:inline text-[#C79801]">•</span>
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#2E7D32]" /> Compra 100% Segura
              </span>
            </div>
          </div>

          {/* 7 Days Guarantee Box */}
          <div className="mt-8 pt-6 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/30 flex items-center justify-center text-[#2E7D32] shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#2B1D12] flex items-center justify-center sm:justify-start gap-1.5">
                Garantia Incondicional de 7 Dias
              </h5>
              <p className="text-xs text-[#5A422D] max-w-sm mt-0.5 leading-relaxed">
                Se você baixar os arquivos e achar que não agregou valor ao seu delivery, basta enviar um e-mail em até 7 dias que devolvemos 100% do seu dinheiro. Sem perguntas.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
