import React, { useState } from 'react';
import { Scissors, Sparkles, Heart, ShieldCheck, Printer } from 'lucide-react';

export const HeroProductMockup: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<'all' | 'kraft' | 'blue' | 'pink'>('all');

  return (
    <div className="relative w-full max-w-4xl mx-auto py-4 sm:py-6 px-2 sm:px-4 select-none">
      {/* Visual filter / paper preview selector pill */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <span className="text-xs text-[#6B533E] font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C79801]" />
          Visualizar papéis de impressão:
        </span>
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-1.5 p-1 rounded-2xl sm:rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs max-w-full">
          <button
            type="button"
            onClick={() => setActiveSheet('all')}
            className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${activeSheet === 'all'
                ? 'bg-[#2B1D12] text-white shadow-xs'
                : 'text-[#6B533E] hover:text-[#2B1D12]'
              }`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('kraft')}
            className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${activeSheet === 'kraft'
                ? 'bg-[#E1AD01] text-[#2B1D12] shadow-xs'
                : 'text-[#6B533E] hover:text-[#2B1D12]'
              }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FAF6F0] border border-[#D3C5B4]"></span>
            Kraft / Creme
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('pink')}
            className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${activeSheet === 'pink'
                ? 'bg-[#F9A8D4] text-[#831843] shadow-xs'
                : 'text-[#6B533E] hover:text-[#2B1D12]'
              }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FCE7F3] border border-[#F472B6]"></span>
            Rosa Pastel
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('blue')}
            className={`px-2.5 sm:px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${activeSheet === 'blue'
                ? 'bg-[#93C5FD] text-[#1E3A8A] shadow-xs'
                : 'text-[#6B533E] hover:text-[#2B1D12]'
              }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0F2FE] border border-[#60A5FA]"></span>
            Azul Suave
          </button>
        </div>
      </div>

      {/* Main Composition: Centered and Enlarged Fan of 3 A4 Sheets */}
      <div className="relative w-full max-w-3xl lg:max-w-4xl h-[350px] sm:h-[450px] md:h-[500px] flex items-center justify-center mx-auto">

        {/* SHEET 1: Pink Paper (Left Tilt) */}
        <div
          onClick={() => setActiveSheet('pink')}
          className={`absolute w-[215px] min-[390px]:w-[245px] sm:w-[290px] md:w-[330px] h-[320px] min-[390px]:h-[350px] sm:h-[420px] md:h-[470px] rounded-xl p-2.5 sm:p-4 bg-[#FCE7F3] border border-[#F472B6]/50 transition-all duration-500 ease-out transform cursor-pointer ${activeSheet === 'pink'
              ? 'rotate-0 translate-x-0 scale-100 sm:scale-105 z-30 opacity-100 shadow-2xl'
              : activeSheet === 'all'
                ? '-rotate-6 sm:-rotate-8 -translate-x-10 min-[390px]:-translate-x-14 sm:-translate-x-28 md:-translate-x-44 scale-95 opacity-100 z-10 hover:z-30 hover:scale-100 shadow-xl'
                : '-rotate-12 -translate-x-16 sm:-translate-x-40 md:-translate-x-60 scale-85 opacity-25 pointer-events-none shadow-md'
            }`}
          style={{
            boxShadow: activeSheet === 'pink'
              ? '0 24px 48px -12px rgba(219, 39, 119, 0.25), 0 8px 20px -4px rgba(0, 0, 0, 0.08)'
              : '0 16px 32px -8px rgba(219, 39, 119, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* A4 Header info */}
          <div className="flex justify-between items-center pb-2 border-b border-[#F472B6]/40 mb-2 sm:mb-3">
            <span className="text-[9.5px] sm:text-[11px] font-bold text-[#9D174D] uppercase tracking-wider font-sans">
              Folha A4 • Versículos 01 a 24
            </span>
            <span className="text-[8.5px] sm:text-[10px] text-[#BE185D] font-semibold flex items-center gap-1 bg-white/60 px-1.5 py-0.5 rounded">
              <Scissors className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Linhas de Corte
            </span>
          </div>

          {/* Grid of verse tickets */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 h-[82%] sm:h-[84%]">
            {[
              { ref: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.' },
              { ref: 'Filipenses 4:13', text: 'Tudo posso naquele que me fortalece.' },
              { ref: 'Números 6:24', text: 'O Senhor te abençoe e te guarde sempre.' },
              { ref: 'Salmos 37:5', text: 'Entrega o teu caminho ao Senhor e confia.' },
              { ref: 'Josué 1:9', text: 'Seja forte e corajoso, o Senhor é contigo.' },
              { ref: 'Jeremias 29:11', text: 'Planos de paz e esperança para você.' },
              { ref: '1 Coríntios 13', text: 'O amor tudo sofre, tudo crê e tudo espera.' },
              { ref: 'Salmos 91:1', text: 'Aquele que habita no esconderijo do Altíssimo.' },
              { ref: 'Mateus 5:14', text: 'Vocês são a luz do mundo; brilhem sempre!' },
            ].map((v, i) => (
              <div
                key={i}
                className="bg-white/85 rounded-md border border-dashed border-[#F472B6]/70 p-1.5 sm:p-2 flex flex-col justify-between text-[7px] sm:text-[8.5px] md:text-[9.5px] leading-tight text-[#831843] shadow-2xs hover:bg-white transition-colors"
              >
                <p className="font-serif italic font-medium line-clamp-3">"{v.text}"</p>
                <div className="flex justify-between items-center pt-1 border-t border-pink-100 text-[6.5px] sm:text-[7.5px] md:text-[8px] font-bold text-[#9D174D]">
                  <span>{v.ref}</span>
                  <Heart className="w-2 h-2 fill-pink-400 text-pink-500 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHEET 2: Blue Pastel Paper (Right Tilt) */}
        <div
          onClick={() => setActiveSheet('blue')}
          className={`absolute w-[215px] min-[390px]:w-[245px] sm:w-[290px] md:w-[330px] h-[320px] min-[390px]:h-[350px] sm:h-[420px] md:h-[470px] rounded-xl p-2.5 sm:p-4 bg-[#E0F2FE] border border-[#60A5FA]/50 transition-all duration-500 ease-out transform cursor-pointer ${activeSheet === 'blue'
              ? 'rotate-0 translate-x-0 scale-100 sm:scale-105 z-30 opacity-100 shadow-2xl'
              : activeSheet === 'all'
                ? 'rotate-6 sm:rotate-8 translate-x-10 min-[390px]:translate-x-14 sm:translate-x-28 md:translate-x-44 scale-95 opacity-100 z-10 hover:z-30 hover:scale-100 shadow-xl'
                : 'rotate-12 translate-x-16 sm:translate-x-40 md:translate-x-60 scale-85 opacity-25 pointer-events-none shadow-md'
            }`}
          style={{
            boxShadow: activeSheet === 'blue'
              ? '0 24px 48px -12px rgba(37, 99, 235, 0.25), 0 8px 20px -4px rgba(0, 0, 0, 0.08)'
              : '0 16px 32px -8px rgba(37, 99, 235, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex justify-between items-center pb-2 border-b border-[#60A5FA]/40 mb-2 sm:mb-3">
            <span className="text-[9px] min-[390px]:text-[9.5px] sm:text-[11px] font-bold text-[#1E40AF] uppercase tracking-wider font-sans">
              Folha A4 • Versículos 25 a 48
            </span>
            <span className="text-[8px] min-[390px]:text-[8.5px] sm:text-[10px] text-[#2563EB] font-semibold flex items-center gap-1 bg-white/60 px-1.5 py-0.5 rounded">
              <Scissors className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Recorte Fácil
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 sm:gap-2 h-[82%] sm:h-[84%]">
            {[
              { ref: 'Isaías 41:10', text: 'Não temas, porque eu sou contigo e te sustento.' },
              { ref: 'Salmos 121:1', text: 'Elevo os olhos para os montes; o socorro vem de Deus.' },
              { ref: 'Provérbios 3:5', text: 'Confie no Senhor de todo o seu coração.' },
              { ref: 'João 14:27', text: 'Deixo-vos a paz, a minha paz vos dou sempre.' },
              { ref: 'Romanos 8:31', text: 'Se Deus é por nós, quem será contra nós?' },
              { ref: 'Salmos 46:1', text: 'Deus é o nosso refúgio e fortaleza bem presente.' },
              { ref: '1 Pedro 5:7', text: 'Lancem sobre Ele toda a vossa ansiedade.' },
              { ref: 'Salmos 103:2', text: 'Bendize, ó minha alma, ao Senhor em todo tempo.' },
              { ref: 'Mateus 6:33', text: 'Buscai primeiro o Reino de Deus e sua justiça.' },
            ].map((v, i) => (
              <div
                key={i}
                className="bg-white/85 rounded-md border border-dashed border-[#60A5FA]/70 p-1 min-[390px]:p-1.5 sm:p-2 flex flex-col justify-between text-[6.5px] min-[390px]:text-[7px] sm:text-[8.5px] md:text-[9.5px] leading-tight text-[#1E3A8A] shadow-2xs hover:bg-white transition-colors"
              >
                <p className="font-serif italic font-medium line-clamp-3">"{v.text}"</p>
                <div className="flex justify-between items-center pt-1 border-t border-blue-100 text-[6px] min-[390px]:text-[6.5px] sm:text-[7.5px] md:text-[8px] font-bold text-[#1D4ED8]">
                  <span>{v.ref}</span>
                  <Sparkles className="w-2 h-2 text-blue-500 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHEET 3: Main Kraft / Cream Paper (Center Stage - Prominent) */}
        <div
          onClick={() => setActiveSheet('kraft')}
          className={`absolute w-[230px] min-[390px]:w-[260px] sm:w-[310px] md:w-[350px] h-[335px] min-[390px]:h-[370px] sm:h-[440px] md:h-[490px] rounded-xl p-2.5 sm:p-4 bg-[#FAF6F0] border-2 border-[#E8DFD5] transition-all duration-500 ease-out transform cursor-pointer ${activeSheet === 'kraft'
              ? 'rotate-0 translate-x-0 scale-100 sm:scale-105 z-30 opacity-100 shadow-2xl'
              : activeSheet === 'all'
                ? 'rotate-0 translate-x-0 scale-100 z-20 hover:scale-102 shadow-2xl'
                : 'rotate-0 translate-x-0 scale-90 opacity-30 pointer-events-none shadow-md'
            }`}
          style={{
            boxShadow: '0 24px 48px -12px rgba(75, 54, 33, 0.22), 0 8px 20px -4px rgba(75, 54, 33, 0.12)'
          }}
        >
          {/* Top A4 Print Stamp */}
          <div className="flex justify-between items-center pb-2 border-b border-[#D3C5B4] mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#C79801]"></span>
              <span className="text-[10px] sm:text-[11.5px] font-extrabold text-[#2B1D12] uppercase tracking-wider font-serif">
                PDF 365 VERSÍCULOS • IMPRESSÃO A4
              </span>
            </div>
            <span className="text-[8.5px] sm:text-[10px] text-[#8A6700] font-bold bg-[#E1AD01]/20 px-2 py-0.5 rounded-md">
              Pronto p/ Imprimir
            </span>
          </div>

          {/* Grid 3x3 of crisp tickets with staple indication */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 h-[82%] sm:h-[84%]">
            {[
              { ref: 'Números 6:24', text: 'O Senhor te abençoe e te guarde sempre em paz.', cat: 'Paz' },
              { ref: 'Salmos 23:1', text: 'O Senhor é meu pastor, nada me faltará.', cat: 'Fé' },
              { ref: 'Filipenses 4:13', text: 'Tudo posso naquele que me fortalece.', cat: 'Força' },
              { ref: 'Salmos 37:5', text: 'Entrega teu caminho ao Senhor e confia.', cat: 'Esperança' },
              { ref: '1 Tessalonicenses', text: 'Em tudo dai graças com alegria no coração.', cat: 'Gratidão' },
              { ref: 'Josué 1:9', text: 'Seja forte e corajoso! Deus é contigo.', cat: 'Coragem' },
              { ref: 'Salmos 91:7', text: 'Mil cairão ao teu lado, tu não serás atingido.', cat: 'Proteção' },
              { ref: 'Jeremias 29:11', text: 'Planos de fazê-los prosperar e dar futuro.', cat: 'Futuro' },
              { ref: 'Salmos 127:1', text: 'Se o Senhor edificar a casa, tudo prospera.', cat: 'Família' },
            ].map((v, i) => (
              <div
                key={i}
                className="group relative bg-[#FFFDF9] rounded-md border-2 border-dashed border-[#D3C5B4] hover:border-[#C79801] p-1 min-[390px]:p-1.5 sm:p-2 flex flex-col justify-between text-[7px] min-[390px]:text-[7.5px] sm:text-[9px] md:text-[10px] leading-tight text-[#4B3621] shadow-2xs hover:shadow-sm transition-all"
              >
                {/* Mini staple visual simulator at top-left */}
                <div className="w-2 sm:w-3 h-0.5 sm:h-1 bg-[#8C8275] rounded-xs mb-0.5 self-start"></div>

                <p className="font-serif italic font-medium line-clamp-3 text-[#2B1D12]">
                  "{v.text}"
                </p>

                <div className="flex justify-between items-center pt-0.5 min-[390px]:pt-1 border-t border-[#E8DFD5] text-[6px] min-[390px]:text-[6.5px] sm:text-[7.5px] md:text-[8.5px] font-bold text-[#8A6700]">
                  <span>{v.ref}</span>
                  <span className="text-[5.5px] min-[390px]:text-[6px] sm:text-[7px] px-0.5 min-[390px]:px-1 py-0.2 bg-[#FAF6F0] rounded text-[#6B533E] font-medium">
                    {v.cat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating feature pills underneath mockup (Centered below the fan) */}
      <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 text-xs sm:text-sm text-[#4B3621]">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs hover:border-[#C79801]/40 transition-colors">
          <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C79801] shrink-0" />
          <span className="font-medium text-xs sm:text-sm">Rendimento máximo por folha A4</span>
        </div>
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs hover:border-[#C79801]/40 transition-colors">
          <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C79801] shrink-0" />
          <span className="font-medium text-xs sm:text-sm">Guia pontilhado para corte rápido</span>
        </div>
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs hover:border-[#2E7D32]/40 transition-colors">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2E7D32] shrink-0" />
          <span className="font-medium text-xs sm:text-sm">PDF em 300 DPI Vetorial</span>
        </div>
      </div>
    </div>
  );
};

