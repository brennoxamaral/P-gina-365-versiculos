import React from 'react';
import { Download, Printer, Paperclip, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'Baixe o PDF',
      description: 'Receba o link de download imediato no seu e-mail e WhatsApp logo após a aprovação.',
      icon: Download,
      badge: 'Envio Imediato'
    },
    {
      number: '2',
      title: 'Imprima em A4',
      description: 'Imprima na sua impressora comum em folhas brancas, coloridas ou kraft nobre.',
      icon: Printer,
      badge: 'Qualquer Impressora'
    },
    {
      number: '3',
      title: 'Corte e Grampeie',
      description: 'Corte nas linhas pontilhadas e grampeie na sacola ou embalagem do seu cliente.',
      icon: Paperclip,
      badge: 'Pronto em Segundos'
    }
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#F2EBE3]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-xs font-semibold text-[#8A6700] mb-4 shadow-xs">
            <span>PASSO A PASSO SIMPLES</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1D12] tracking-tight mb-3">
            Como funciona na sua rotina de delivery
          </h2>
          <p className="text-sm sm:text-base text-[#5A422D] leading-relaxed">
            Sem processos complicados ou maquinário caro. Você só precisa de uma tesoura e um grampeador.
          </p>
        </div>

        {/* 3 Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={step.number}
                className="relative bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] p-6 sm:p-7 shadow-craft hover:shadow-craft-lg transition-all duration-300 flex flex-col justify-between h-full group"
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#E1AD01] text-[#2B1D12] font-black text-lg flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {step.number}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F2EBE3] border border-[#E8DFD5] text-[#8A6700]">
                    {step.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2 mb-6">
                  <h3 className="font-serif text-xl font-bold text-[#2B1D12]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#5A422D] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Footer icon line */}
                <div className="pt-4 mt-auto border-t border-[#E8DFD5] flex items-center text-xs text-[#8A6700] font-semibold gap-1.5">
                  <IconComponent className="w-4 h-4 text-[#C79801]" />
                  <span>Passo {step.number} de 3</span>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
