import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { faqs } from '../data/faqs';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('papel');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="duvidas" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#FAF6F0]">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EBE3] border border-[#E8DFD5] text-xs font-semibold text-[#8A6700] mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#C79801]" />
            <span>TIRE SUAS DÚVIDAS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1D12] tracking-tight mb-3">
            Perguntas Frequentes
          </h2>
          <p className="text-sm sm:text-base text-[#5A422D] leading-relaxed">
            Tudo o que você precisa saber sobre a entrega, impressão e aplicação dos bilhetes.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#2B1D12] hover:text-[#C79801] transition-colors cursor-pointer"
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
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-[#5A422D] leading-relaxed border-t border-[#E8DFD5]/60 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp support callout */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-[#F2EBE3] border border-[#E8DFD5] text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-sm sm:text-base text-[#2B1D12]">Ainda ficou com alguma dúvida?</h4>
            <p className="text-xs sm:text-sm text-[#5A422D] mt-0.5">Nossa equipe de atendimento está pronta para te ajudar no WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/5511999999999?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20o%20Kit%20365%20Versículos%20para%20Delivery"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#246328] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors shrink-0 active:scale-95 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
