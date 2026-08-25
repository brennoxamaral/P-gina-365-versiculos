import React, { useState } from 'react';
import { Scissors, Sparkles, Check, Heart, ShieldCheck, Printer, Tag } from 'lucide-react';

export const HeroProductMockup: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<'all' | 'kraft' | 'blue' | 'pink'>('all');

  return (
    <div className="relative w-full max-w-4xl mx-auto py-6 px-2 sm:px-4 select-none">
      {/* Visual filter / paper preview selector pill */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <span className="text-xs text-[#6B533E] font-semibold uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C79801]" />
          Visualizar em diferentes papéis A4:
        </span>
        <div className="inline-flex p-1 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs">
          <button
            type="button"
            onClick={() => setActiveSheet('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              activeSheet === 'all'
                ? 'bg-[#2B1D12] text-white shadow-xs'
                : 'text-[#6B533E] hover:text-[#2B1D12]'
            }`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('kraft')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              activeSheet === 'kraft'
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
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              activeSheet === 'pink'
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
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              activeSheet === 'blue'
                ? 'bg-[#93C5FD] text-[#1E3A8A] shadow-xs'
                : 'text-[#6B533E] hover:text-[#2B1D12]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0F2FE] border border-[#60A5FA]"></span>
            Azul Suave
          </button>
        </div>
      </div>

      {/* Main Composition: Loose, seamless on #F2EBE3 background */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10">
        
        {/* Fan of 3 A4 Sheets Layout */}
        <div className="relative w-full max-w-2xl h-[340px] sm:h-[400px] flex items-center justify-center">
          
          {/* SHEET 1: Pink Paper (Left Tilt) */}
          <div 
            className={`absolute w-[240px] sm:w-[280px] h-[330px] sm:h-[380px] rounded-lg p-3 sm:p-4 bg-[#FCE7F3] border border-[#F472B6]/40 shadow-xl transition-all duration-500 transform ${
              activeSheet === 'all' || activeSheet === 'pink'
                ? '-rotate-8 -translate-x-12 sm:-translate-x-24 scale-95 opacity-100 z-10 hover:z-30 hover:scale-100'
                : 'opacity-20 scale-90 -translate-x-32 pointer-events-none'
            }`}
            style={{
              boxShadow: '0 16px 32px -8px rgba(219, 39, 119, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* A4 Header info */}
            <div className="flex justify-between items-center pb-2 border-b border-[#F472B6]/30 mb-2">
              <span className="text-[10px] font-bold text-[#9D174D] uppercase tracking-wider">
                Folha A4 • Versículos 01 a 24
              </span>
              <span className="text-[9px] text-[#BE185D] font-medium flex items-center gap-0.5">
                <Scissors className="w-2.5 h-2.5" /> Linhas de Corte
              </span>
            </div>

            {/* Grid of verse tickets */}
            <div className="grid grid-cols-3 gap-1.5 h-[85%]">
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
                  className="bg-white/80 rounded border border-dashed border-[#F472B6]/60 p-1 flex flex-col justify-between text-[7px] sm:text-[8px] leading-tight text-[#831843]"
                >
                  <p className="font-serif italic font-medium line-clamp-3">"{v.text}"</p>
                  <div className="flex justify-between items-center pt-0.5 border-t border-pink-100 text-[6.5px] font-semibold text-[#9D174D]">
                    <span>{v.ref}</span>
                    <Heart className="w-1.5 h-1.5 fill-pink-400 text-pink-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHEET 2: Blue Pastel Paper (Center-Right Tilt) */}
          <div 
            className={`absolute w-[240px] sm:w-[280px] h-[330px] sm:h-[380px] rounded-lg p-3 sm:p-4 bg-[#E0F2FE] border border-[#60A5FA]/40 shadow-xl transition-all duration-500 transform ${
              activeSheet === 'all' || activeSheet === 'blue'
                ? 'rotate-3 translate-x-12 sm:translate-x-24 scale-95 opacity-100 z-10 hover:z-30 hover:scale-100'
                : 'opacity-20 scale-90 translate-x-32 pointer-events-none'
            }`}
            style={{
              boxShadow: '0 16px 32px -8px rgba(37, 99, 235, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="flex justify-between items-center pb-2 border-b border-[#60A5FA]/30 mb-2">
              <span className="text-[10px] font-bold text-[#1E40AF] uppercase tracking-wider">
                Folha A4 • Versículos 25 a 48
              </span>
              <span className="text-[9px] text-[#2563EB] font-medium flex items-center gap-0.5">
                <Scissors className="w-2.5 h-2.5" /> Recorte Fácil
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 h-[85%]">
              {[
                { ref: 'Isaías 41:10', text: 'Não temas, porque eu sou contigo e te sustento.' },
                { ref: 'Salmos 121:1', text: 'Elevo os olhos para os montes; meu socorro vem do Senhor.' },
                { ref: 'Provérbios 3:5', text: 'Confie no Senhor de todo o seu coração.' },
                { ref: 'João 14:27', text: 'Deixo-vos a paz, a minha paz vos dou.' },
                { ref: 'Romanos 8:31', text: 'Se Deus é por nós, quem será contra nós?' },
                { ref: 'Salmos 46:1', text: 'Deus é o nosso refúgio e fortaleza presente.' },
                { ref: '1 Pedro 5:7', text: 'Lancem sobre Ele toda a vossa ansiedade.' },
                { ref: 'Salmos 103:2', text: 'Bendize, ó minha alma, ao Senhor em todo tempo.' },
                { ref: 'Mateus 6:33', text: 'Buscai primeiro o Reino de Deus e sua justiça.' },
              ].map((v, i) => (
                <div 
                  key={i}
                  className="bg-white/80 rounded border border-dashed border-[#60A5FA]/60 p-1 flex flex-col justify-between text-[7px] sm:text-[8px] leading-tight text-[#1E3A8A]"
                >
                  <p className="font-serif italic font-medium line-clamp-3">"{v.text}"</p>
                  <div className="flex justify-between items-center pt-0.5 border-t border-blue-100 text-[6.5px] font-semibold text-[#1D4ED8]">
                    <span>{v.ref}</span>
                    <Sparkles className="w-1.5 h-1.5 text-blue-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHEET 3: Main Kraft / Cream Paper (Center Stage - Prominent) */}
          <div 
            className={`absolute w-[250px] sm:w-[300px] h-[345px] sm:h-[395px] rounded-lg p-3 sm:p-4 bg-[#FAF6F0] border-2 border-[#E8DFD5] shadow-2xl transition-all duration-500 transform ${
              activeSheet === 'all' || activeSheet === 'kraft'
                ? 'rotate-0 translate-x-0 scale-100 z-20 hover:scale-105'
                : 'opacity-20 scale-90 pointer-events-none'
            }`}
            style={{
              boxShadow: '0 20px 40px -10px rgba(75, 54, 33, 0.2), 0 6px 16px -2px rgba(75, 54, 33, 0.1)'
            }}
          >
            {/* Top A4 Print Stamp */}
            <div className="flex justify-between items-center pb-2 border-b border-[#D3C5B4] mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C79801]"></span>
                <span className="text-[10.5px] font-bold text-[#2B1D12] uppercase tracking-wider font-serif">
                  PDF 365 VERSÍCULOS • IMPRESSÃO A4
                </span>
              </div>
              <span className="text-[9px] text-[#8A6700] font-bold bg-[#E1AD01]/20 px-1.5 py-0.5 rounded">
                Pronto p/ Imprimir
              </span>
            </div>

            {/* Grid 3x3 of crisp tickets with staple indication */}
            <div className="grid grid-cols-3 gap-1.5 h-[85%]">
              {[
                { ref: 'Números 6:24', text: 'O Senhor te abençoe e te guarde sempre em paz.', cat: 'Paz' },
                { ref: 'Salmos 23:1', text: 'O Senhor é meu pastor, nada me faltará.', cat: 'Fé' },
                { ref: 'Filipenses 4:13', text: 'Tudo posso naquele que me fortalece.', cat: 'Força' },
                { ref: 'Salmos 37:5', text: 'Entrega teu caminho ao Senhor e confia.', cat: 'Esperança' },
                { ref: '1 Tessalonicenses', text: 'Em tudo dai graças com o coração.', cat: 'Gratidão' },
                { ref: 'Josué 1:9', text: 'Seja forte e corajoso! Deus é contigo.', cat: 'Coragem' },
                { ref: 'Salmos 91:7', text: 'Mil cairão ao teu lado, tu não serás atingido.', cat: 'Proteção' },
                { ref: 'Jeremias 29:11', text: 'Planos de fazê-los prosperar e dar futuro.', cat: 'Prosperidade' },
                { ref: 'Salmos 127:1', text: 'Se o Senhor não edificar a casa, em vão.', cat: 'Família' },
              ].map((v, i) => (
                <div 
                  key={i}
                  className="group relative bg-[#FFFDF9] rounded-md border-2 border-dashed border-[#D3C5B4] hover:border-[#C79801] p-1.5 flex flex-col justify-between text-[7.5px] sm:text-[8.5px] leading-tight text-[#4B3621] shadow-2xs hover:shadow-sm transition-all"
                >
                  {/* Mini staple visual simulator at top-left */}
                  <div className="w-2.5 h-0.5 bg-[#8C8275] rounded-xs mb-0.5 self-start"></div>

                  <p className="font-serif italic font-medium line-clamp-3 text-[#2B1D12]">
                    "{v.text}"
                  </p>
                  
                  <div className="flex justify-between items-center pt-1 border-t border-[#E8DFD5] text-[6.5px] font-bold text-[#8A6700]">
                    <span>{v.ref}</span>
                    <span className="text-[6px] px-1 py-0.2 bg-[#FAF6F0] rounded text-[#6B533E]">
                      {v.cat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real Delivery Application Mini-Mockup (Kraft Bag with Stapled Tag) */}
        <div className="w-full sm:w-auto flex flex-col items-center">
          <div className="relative w-64 sm:w-72 bg-[#D6B788] rounded-t-lg rounded-b-xl border-2 border-[#B89665] p-4 shadow-xl text-[#3A2411] flex flex-col justify-between overflow-hidden">
            {/* Kraft bag realistic top fold and crease */}
            <div className="w-full h-3 border-b-2 border-dashed border-[#B89665]/60 mb-3 flex items-center justify-center">
              <span className="w-12 h-1 bg-[#8C6D43]/40 rounded-full"></span>
            </div>

            {/* Delivery shop mock logo */}
            <div className="text-center my-2">
              <span className="text-xs uppercase tracking-widest font-serif font-black text-[#523315]">
                SEU DELIVERY
              </span>
              <p className="text-[10px] text-[#7A4E20]">Hamburgueria • Pizzaria • Marmitas</p>
            </div>

            {/* Stapled Tag Visual on bag */}
            <div className="relative mx-auto w-48 bg-[#FAF6F0] rounded border-2 border-dashed border-[#C79801] p-3 shadow-md my-2 rotate-1 transform hover:rotate-0 transition-transform">
              {/* Metallic Staple */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#64748B] rounded-xs shadow-xs"></div>
              
              <div className="text-center space-y-1">
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#8A6700] block">
                  Mensagem de Hoje
                </span>
                <p className="font-serif italic text-xs text-[#2B1D12] font-semibold leading-relaxed">
                  "O Senhor te abençoe e te guarde; faça resplandecer o Seu rosto sobre ti."
                </p>
                <div className="flex items-center justify-center gap-1 text-[9px] font-bold text-[#C79801] pt-1">
                  <span>Números 6:24</span>
                  <Heart className="w-2.5 h-2.5 fill-[#E1AD01]" />
                </div>
              </div>
            </div>

            {/* Bottom bag seal */}
            <div className="mt-3 pt-2 border-t border-[#B89665]/40 flex items-center justify-between text-[9px] text-[#523315] font-semibold">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-[#2E7D32]" /> Feito com carinho
              </span>
              <span>100% Encantador</span>
            </div>
          </div>
          
          <span className="mt-2 text-xs font-semibold text-[#6B533E] flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-[#C79801]" />
            Como fica na embalagem do seu cliente
          </span>
        </div>

      </div>

      {/* Floating feature pills underneath mockup (still free-floating, no container cage) */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-[#4B3621]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs">
          <Printer className="w-3.5 h-3.5 text-[#C79801]" />
          <span>Rendimento máximo por folha A4</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs">
          <Scissors className="w-3.5 h-3.5 text-[#C79801]" />
          <span>Guia pontilhado para corte rápido</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
          <span>PDF em 300 DPI Vetorial</span>
        </div>
      </div>
    </div>
  );
};
