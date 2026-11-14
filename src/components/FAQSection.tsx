import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';
import { faqs } from '../data/faqs';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('papel');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="duvidas" className="py-16 sm:py-20 md:py-24 px-5 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#FAF6F0]">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EBE3] border border-[#E8DFD5] text-xs font-medium text-[#8A6700] mb-3.5 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#C79801]" />
            <span>TIRE SUAS DÚVIDAS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#2B1D12] tracking-tight mb-3">
            Perguntas Frequentes
          </h2>
          <p className="text-sm sm:text-base md:text-[17px] text-[#5A422D] leading-relaxed">
            Respostas rápidas sobre entrega, impressão e uso.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base md:text-[17px] text-[#2B1D12] hover:text-[#C79801] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8A6700] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C79801]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-2 text-sm sm:text-[15px] text-[#5A422D] leading-relaxed border-t border-[#E8DFD5]/60 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Editorial WhatsApp Closing Moment */}
        <div className="mt-14 sm:mt-16 pt-12 sm:pt-14 border-t border-[#E8DFD5] text-center flex flex-col items-center">
          {/* Live status micro-badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EBE3] border border-[#E8DFD5] text-xs font-medium text-[#8A6700] mb-4 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
            <span>ATENDIMENTO HUMANO • SEM ROBÔS</span>
          </div>

          {/* Brown & Yellow Editorial Headline */}
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#2B1D12] tracking-tight leading-[1.15] text-balance max-w-xl mx-auto">
            Ainda restou alguma dúvida?{' '}
            <span className="block sm:inline italic text-[#C79801]">
              Converse direto com a gente.
            </span>
          </h3>

          {/* Concise microcopy */}
          <p className="text-sm sm:text-base text-[#5A422D] max-w-md mx-auto mt-3 leading-relaxed">
            Nossa equipe responde rapidinho no WhatsApp para te ajudar com o que precisar.
          </p>

          {/* Solid Green WhatsApp Button */}
          <div className="mt-6 sm:mt-7 w-full sm:w-auto flex justify-center">
            <a
              href="https://wa.me/5567981326047?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20Kit%20365%20Vers%C3%ADculos%20para%20Delivery"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs sm:w-auto sm:max-w-full min-h-[48px] sm:min-h-[52px] py-3.5 px-6 sm:px-8 rounded-2xl bg-[#2E7D32] hover:bg-[#246328] active:scale-98 text-white font-semibold text-sm sm:text-base tracking-tight shadow-craft transition-all duration-300 inline-flex items-center justify-center gap-2.5 group"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
              <span className="whitespace-nowrap">Chamar no WhatsApp agora</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
