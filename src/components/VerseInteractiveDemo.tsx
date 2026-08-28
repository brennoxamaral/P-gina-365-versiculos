import React, { useState } from 'react';
import { Sparkles, RefreshCw, Scissors, Heart, Bookmark, Shuffle, Check, Palette } from 'lucide-react';
import { sampleVerses } from '../data/verses';

export const VerseInteractiveDemo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paperStyle, setPaperStyle] = useState<'kraft' | 'pink' | 'blue'>('kraft');
  const [isChanging, setIsChanging] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentVerse = sampleVerses[currentIndex];

  const handleNextVerse = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleVerses.length);
      setIsChanging(false);
    }, 200);
  };

  const handleRandomVerse = () => {
    setIsChanging(true);
    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * sampleVerses.length);
      if (randomIndex === currentIndex) {
        randomIndex = (currentIndex + 1) % sampleVerses.length;
      }
      setCurrentIndex(randomIndex);
      setIsChanging(false);
    }, 200);
  };

  const paperClasses = {
    kraft: 'bg-[#FAF6F0] border-[#D3C5B4] text-[#4B3621]',
    pink: 'bg-[#FCE7F3] border-[#F472B6]/60 text-[#831843]',
    blue: 'bg-[#E0F2FE] border-[#60A5FA]/60 text-[#1E3A8A]',
  };

  const paperAccentClasses = {
    kraft: 'text-[#8A6700] bg-[#E1AD01]/15',
    pink: 'text-[#9D174D] bg-[#F472B6]/20',
    blue: 'text-[#1D4ED8] bg-[#60A5FA]/20',
  };

  const stapleClasses = {
    kraft: 'bg-[#8C8275]',
    pink: 'bg-[#BE185D]',
    blue: 'bg-[#2563EB]',
  };

  return (
    <section id="versiculos" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#FAF6F0]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EBE3] border border-[#E8DFD5] text-xs font-semibold text-[#8A6700] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C79801]" />
          <span>EXPERIMENTE NA PRÁTICA</span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1D12] tracking-tight mb-3">
          Sinta a emoção que seu cliente vai receber
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#5A422D] max-w-xl mb-8 leading-relaxed">
          Cada bilhete foi cuidadosamente selecionado com mensagens edificantes e de fé. Teste o sorteador interativo abaixo:
        </p>

        {/* Paper style selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs text-[#6B533E]">
          <span className="font-semibold flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-[#C79801]" /> Cor do papel:
          </span>
          <div className="flex flex-wrap gap-1 p-1 bg-[#F2EBE3] rounded-full border border-[#E8DFD5]">
            <button
              type="button"
              onClick={() => setPaperStyle('kraft')}
              className={`px-3 py-1.5 min-h-[36px] rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center ${paperStyle === 'kraft' ? 'bg-[#E1AD01] text-[#2B1D12] shadow-2xs' : 'text-[#6B533E] hover:text-[#2B1D12]'
                }`}
            >
              Kraft / Creme
            </button>
            <button
              type="button"
              onClick={() => setPaperStyle('pink')}
              className={`px-3 py-1.5 min-h-[36px] rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center ${paperStyle === 'pink' ? 'bg-[#F9A8D4] text-[#831843] shadow-2xs' : 'text-[#6B533E] hover:text-[#2B1D12]'
                }`}
            >
              Rosa
            </button>
            <button
              type="button"
              onClick={() => setPaperStyle('blue')}
              className={`px-3 py-1.5 min-h-[36px] rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center ${paperStyle === 'blue' ? 'bg-[#93C5FD] text-[#1E3A8A] shadow-2xs' : 'text-[#6B533E] hover:text-[#2B1D12]'
                }`}
            >
              Azul
            </button>
          </div>
        </div>

        {/* Artisanal Ticket Card (with cut lines and realistic staple) */}
        <div className="relative w-full max-w-lg mx-auto">

          {/* Top Scissors Cutting Guideline Indicator */}
          <div className="flex items-center justify-between text-xs text-[#8C7A6B] mb-2 px-2">
            <span className="flex items-center gap-1">
              <Scissors className="w-3.5 h-3.5 text-[#C79801]" />
              Linha pontilhada de corte
            </span>
            <span className="font-semibold text-[11px] bg-[#F2EBE3] border border-[#E8DFD5] px-2 py-0.5 rounded-md text-[#8A6700]">
              Versículo #{currentVerse.dailyNumber} de 365
            </span>
          </div>

          {/* Ticket Body */}
          <div
            className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-8 shadow-craft-lg transition-all duration-300 transform ${paperClasses[paperStyle]
              } ${isChanging ? 'opacity-40 scale-98' : 'opacity-100 scale-100'}`}
          >
            {/* Realistic metallic staple at top corner */}
            <div className="absolute top-4 left-6 flex items-center gap-1.5">
              <div className={`w-5 h-1.5 rounded-xs shadow-xs ${stapleClasses[paperStyle]}`}></div>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                Grampo na sacola
              </span>
            </div>

            {/* Category Pill Tag */}
            <div className="flex justify-end mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${paperAccentClasses[paperStyle]}`}>
                Tema: {currentVerse.category}
              </span>
            </div>

            {/* Quote Body */}
            <div className="my-4 min-h-[110px] flex items-center justify-center">
              <p className="font-serif italic text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
                “{currentVerse.text}”
              </p>
            </div>

            {/* Reference & Branding */}
            <div className="pt-4 border-t border-dashed border-current/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#C79801]" />
                <span className="text-sm tracking-wide">{currentVerse.reference}</span>
              </div>
              <div className="flex items-center gap-1 opacity-75 font-serif italic text-xs">
                <span>Feito com carinho para você</span>
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

          </div>

          {/* Action Buttons: Next / Random */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <button
              type="button"
              onClick={handleRandomVerse}
              id="btn-sortear-versiculo"
              className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 rounded-xl bg-[#F2EBE3] hover:bg-[#FFFDF9] border border-[#E8DFD5] hover:border-[#C79801] text-[#2B1D12] font-bold text-sm shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Shuffle className="w-4 h-4 text-[#C79801]" />
              <span>Sortear outra bênção</span>
            </button>

            <button
              type="button"
              onClick={handleNextVerse}
              id="btn-proximo-versiculo"
              className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] text-[#2B1D12] font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 text-[#2B1D12] ${isChanging ? 'animate-spin' : ''}`} />
              <span>Ver próximo versículo</span>
            </button>
          </div>

          <p className="mt-3 text-xs text-[#8C7A6B]">
            São 365 mensagens diferentes no arquivo PDF — você nunca repetirá o mesmo versículo.
          </p>

        </div>

      </div>
    </section>
  );
};
