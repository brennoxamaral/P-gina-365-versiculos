import React, { useState } from 'react';
import { Play, Film } from 'lucide-react';

interface VideoSectionProps {
  youtubeVideoId?: string;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ youtubeVideoId = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="demonstracao" className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#FAF6F0]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Subheadline */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
            
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EBE3] border border-[#E8DFD5] text-xs font-semibold text-[#8A6700] mb-4">
              <Film className="w-3.5 h-3.5 text-[#C79801]" />
              <span>DEMONSTRAÇÃO PRÁTICA</span>
            </div>

            {/* Section Title */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B1D12] tracking-tight mb-4 leading-tight">
              Veja como é simples aplicar no seu delivery
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#5A422D] leading-relaxed max-w-xl">
              Assista ao vídeo em menos de 1 minuto e veja como a impressão, corte e aplicação nas sacolas é rápida e não atrasa a sua expedição.
            </p>

          </div>

          {/* Right Column: Dedicated 9:16 Vertical Video Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[270px] sm:max-w-[290px] aspect-[9/16] rounded-3xl bg-[#2B1D12] border-4 border-[#E8DFD5] shadow-craft-lg overflow-hidden flex flex-col items-center justify-center text-white">
              
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
                  <div className="flex items-center justify-between text-xs text-[#E8DFD5] pt-1">
                    <span className="flex items-center gap-1.5 font-semibold text-[#E1AD01]">
                      <span className="w-2 h-2 rounded-full bg-[#E1AD01] animate-ping"></span>
                      Bancada de Delivery
                    </span>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-xs text-[#E8DFD5]">
                      0:45 min
                    </span>
                  </div>

                  {/* Center visual: Interactive Play button */}
                  <div className="flex flex-col items-center text-center my-auto space-y-4">
                    {/* Big Play Button with ripple effect */}
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-full bg-[#E1AD01]/20 animate-pulse"></div>
                      <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        className="relative w-16 h-16 rounded-full bg-[#E1AD01] hover:bg-[#C79801] text-[#2B1D12] flex items-center justify-center shadow-gold hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                        aria-label="Assistir demonstração"
                        id="btn-play-video"
                      >
                        <Play className="w-7 h-7 fill-[#2B1D12] translate-x-0.5 text-[#2B1D12]" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-[#FAF6F0] font-semibold">
                        Demonstração Prática
                      </p>
                      <p className="text-xs text-[#D3C5B4] font-normal">
                        Clique para iniciar o vídeo
                      </p>
                    </div>
                  </div>

                  {/* Bottom subtle indicator */}
                  <div className="text-center pb-1">
                    <span className="text-[10px] text-[#A69788] uppercase tracking-wider font-semibold">
                      Vídeo Explicativo
                    </span>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
