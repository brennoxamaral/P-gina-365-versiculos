import React, { useState } from 'react';
import { Download, Printer, Scissors, Image as ImageIcon, LucideIcon } from 'lucide-react';

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
}

const STEPS: StepItem[] = [
  {
    number: '1',
    title: 'Baixe o PDF',
    description: 'Receba o arquivo na hora no seu e-mail e WhatsApp.',
    icon: Download,
    image: '/how-it-works/passo-1.jpg',
    imageAlt: 'Celular e computador exibindo o PDF de 365 versículos pronto para download',
  },
  {
    number: '2',
    title: 'Imprima em A4',
    description: 'Em casa ou na gráfica, no papel que preferir.',
    icon: Printer,
    image: '/how-it-works/passo-2.jpg',
    imageAlt: 'Folhas A4 coloridas e kraft impressas com os bilhetes de versículos',
  },
  {
    number: '3',
    title: 'Corte e Grampeie',
    description: 'Recorte nas linhas e prenda na embalagem do pedido.',
    icon: Scissors,
    image: '/how-it-works/passo-3.jpg',
    imageAlt: 'Bilhete de versículo grampeado em uma sacola kraft de delivery',
  },
];

export const HowItWorks: React.FC = () => {
  const [missingImages, setMissingImages] = useState<Record<string, boolean>>({});

  const handleImageError = (stepNumber: string) => {
    setMissingImages((prev) =>
      prev[stepNumber] ? prev : { ...prev, [stepNumber]: true }
    );
  };

  return (
    <section id="como-funciona" className="py-16 sm:py-20 md:py-24 px-5 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#FAF6F0]">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EBE3] border border-[#E8DFD5] text-xs font-medium text-[#8A6700] mb-3.5 shadow-2xs">
            <span>PASSO A PASSO</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#2B1D12] tracking-tight mb-3">
            Como funciona na prática
          </h2>
          <p className="text-sm sm:text-base md:text-[17px] text-[#5A422D] leading-relaxed">
            Sem complicação: só precisa de impressora, tesoura e grampeador.
          </p>
        </div>

        {/* 3 Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 relative">
          {STEPS.map((step) => {
            const IconComponent = step.icon;
            const isMissing = Boolean(missingImages[step.number]);

            return (
              <article
                key={step.number}
                className="bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] p-5 sm:p-6 shadow-craft hover:shadow-craft-lg transition-all duration-300 flex flex-col group"
              >
                {isMissing ? (
                  <div className="media w-full aspect-[4/3] rounded-xl bg-[#F2EBE3]/70 border border-dashed border-[#D3C5B4] mb-5 flex flex-col items-center justify-center gap-2 text-[#6B533E] transition-colors group-hover:border-[#C79801]/60">
                    <div className="w-11 h-11 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center shadow-2xs">
                      <IconComponent className="w-5 h-5 text-[#8A6700]" aria-hidden="true" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B533E]">
                      <ImageIcon className="w-3.5 h-3.5 text-[#8A6700]" aria-hidden="true" />
                      Imagem do Passo {step.number}
                    </span>
                  </div>
                ) : (
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    loading="lazy"
                    decoding="async"
                    onError={() => handleImageError(step.number)}
                    className="w-full aspect-[4/3] object-cover rounded-xl border border-[#E8DFD5] mb-5 group-hover:scale-[1.02] transition-transform duration-300"
                  />
                )}

                <header className="flex items-center gap-2.5 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-[#E1AD01] text-[#2B1D12] font-semibold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-xl md:text-[22px] font-medium text-[#2B1D12]">
                    {step.title}
                  </h3>
                </header>

                <p className="text-sm sm:text-[15px] text-[#5A422D] leading-relaxed">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
