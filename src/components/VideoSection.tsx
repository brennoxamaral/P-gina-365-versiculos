import React, { useState } from 'react';
import { Play, Sparkles, Check, Film, Scissors, Heart, Volume2, Maximize2 } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string>(''); // Default is custom interactive visual preview
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUrl.trim()) {
      setYoutubeVideoId('');
      setIsEditingUrl(false);
      return;
    }
    // Extract video ID from youtube formats (shorts, watch, share)
    const match = tempUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/);
    if (match && match[1]) {
      setYoutubeVideoId(match[1]);
      setIsPlaying(true);
    } else {
      setYoutubeVideoId(tempUrl.trim());
      setIsPlaying(true);
    }
    setIsEditingUrl(false);
  };

  return (
    <section id="demonstracao" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#FAF6F0]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EBE3] border border-[#E8DFD5] text-xs font-semibold text-[#8A6700] mb-4">
          <Film className="w-3.5 h-3.5 text-[#C79801]" />
          <span>DEMONSTRAÇÃO PRÁTICA</span>
        </div>

        {/* Section Title */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1D12] tracking-tight mb-3">
          Veja como é simples aplicar na sua bancada
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#5A422D] max-w-xl mb-8 leading-relaxed">
          Assista ao vídeo em menos de 1 minuto e veja como a impressão, corte e aplicação nas sacolas é rápida e não atrasa a sua expedição.
        </p>

        {/* Dedicated 9:16 Vertical Video Container (Max ~360px width) */}
        <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-3xl bg-[#2B1D12] border-4 border-[#E8DFD5] shadow-craft-lg overflow-hidden flex flex-col items-center justify-center text-white">
          
          {youtubeVideoId && isPlaying ? (
            /* Real YouTube Embed (Vertical/Shorts ready) */
            <iframe
              className="w-full h-full object-cover rounded-2xl"
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Demonstração Prática do Kit 365 Versículos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            /* High Quality Simulated Craft Video Poster / Interactive Player */
            <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#3B291A] via-[#2B1D12] to-[#1F140C] text-left">
              
              {/* Top status bar inside simulated video */}
              <div className="flex items-center justify-between text-xs text-[#E8DFD5] pt-2">
                <span className="flex items-center gap-1.5 font-semibold text-[#E1AD01]">
                  <span className="w-2 h-2 rounded-full bg-[#E1AD01] animate-ping"></span>
                  Bancada de Delivery
                </span>
                <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  Passo a Passo
                </span>
              </div>

              {/* Center visual: Interactive Play button & preview cards */}
              <div className="flex flex-col items-center text-center my-auto space-y-4">
                
                {/* Visual preview card */}
                <div className="w-48 bg-[#FAF6F0] rounded-xl p-3 text-[#2B1D12] shadow-xl border border-[#E8DFD5] rotate-2 transform hover:rotate-0 transition-transform">
                  <div className="w-3 h-0.5 bg-[#8C8275] rounded-xs mb-1.5"></div>
                  <p className="font-serif italic text-xs font-semibold leading-tight">
                    "O Senhor te abençoe e te guarde hoje e sempre."
                  </p>
                  <span className="text-[9px] font-bold text-[#8A6700] block mt-1">
                    Números 6:24 • Grampeado na Sacola
                  </span>
                </div>

                {/* Big Play Button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-[#E1AD01] hover:bg-[#C79801] text-[#2B1D12] flex items-center justify-center shadow-gold hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                  aria-label="Assistir demonstração"
                  id="btn-play-video"
                >
                  <Play className="w-7 h-7 fill-[#2B1D12] translate-x-0.5 text-[#2B1D12]" />
                </button>

                <p className="text-xs text-[#E8DFD5] font-medium max-w-[200px]">
                  Clique para iniciar a demonstração prática
                </p>
              </div>

              {/* Bottom video features checklist */}
              <div className="space-y-1.5 pb-2 text-[11px] text-[#D3C5B4] border-t border-white/10 pt-3">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#E1AD01] shrink-0" />
                  <span>Impressão em menos de 1 minuto</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#E1AD01] shrink-0" />
                  <span>Corte fácil com tesoura ou régua</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#E1AD01] shrink-0" />
                  <span>Aplicação com 1 único grampo</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Video Embed URL Switcher Tooltip (for easy customization if the merchant has their own YouTube Shorts) */}
        <div className="mt-4 flex flex-col items-center">
          {!isEditingUrl ? (
            <button
              type="button"
              onClick={() => setIsEditingUrl(true)}
              className="text-xs text-[#6B533E] hover:text-[#2B1D12] underline font-medium cursor-pointer transition-colors"
            >
              {youtubeVideoId ? 'Trocar link do vídeo do YouTube' : '⚙️ Inserir link de vídeo próprio do YouTube (Opcional)'}
            </button>
          ) : (
            <form onSubmit={handleApplyUrl} className="mt-2 flex items-center gap-2 max-w-sm w-full">
              <input
                type="text"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="Cole o link do YouTube Shorts/Vídeo"
                className="text-xs px-3 py-1.5 rounded-lg bg-[#FAF6F0] border border-[#E8DFD5] text-[#2B1D12] focus:outline-none focus:border-[#C79801] flex-1"
              />
              <button
                type="submit"
                className="text-xs px-3 py-1.5 bg-[#E1AD01] text-[#2B1D12] font-bold rounded-lg hover:bg-[#C79801]"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setIsEditingUrl(false)}
                className="text-xs px-2 py-1.5 text-[#6B533E] hover:text-[#2B1D12]"
              >
                Cancelar
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
