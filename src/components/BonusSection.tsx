import React from 'react';
import { Gift, Sparkles, Check } from 'lucide-react';

interface BonusSectionProps {
  onOpenCheckout: () => void;
}

export const BonusSection: React.FC<BonusSectionProps> = ({ onOpenCheckout }) => {
  return (
    <section id="bonus" className="py-16 sm:py-20 md:py-24 px-5 sm:px-6 lg:px-8 border-t border-[#E8DFD5] bg-[#FAF6F0]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2EBE3] border border-[#E8DFD5] text-xs font-medium text-[#8A6700] mb-3.5 shadow-2xs">
            <Gift className="w-3.5 h-3.5 text-[#C79801]" />
            <span>BÔNUS INCLUSO</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#2B1D12] tracking-tight mb-3">
            Bônus: Cartão Editável no Canva
          </h2>
          <p className="text-sm sm:text-base md:text-[17px] text-[#5A422D] leading-relaxed">
            Cartão com QR Code para seus clientes marcarem sua loja no Instagram.
          </p>
        </div>

        {/* Highlight Bonus Card Container */}
        <div className="bg-[#FAF6F0] rounded-3xl border border-[#E1AD01] p-6 sm:p-8 lg:p-10 shadow-craft-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative overflow-hidden">
          
          {/* Top Value Stamp */}
          <div className="lg:absolute lg:top-6 lg:right-6 z-20 bg-[#E1AD01] text-[#2B1D12] text-xs font-semibold px-3.5 py-1 rounded-full shadow-2xs uppercase tracking-wider self-center lg:self-auto justify-self-center lg:justify-self-end -mb-2 lg:mb-0">
            100% Grátis com o Kit
          </div>

          {/* Left Column: Visual Mockup of the Bonus Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div className="relative w-64 sm:w-72 bg-[#FAF6F0] rounded-2xl border border-[#D3C5B4] shadow-xl p-6 text-center text-[#4B3621] overflow-hidden transform hover:scale-102 transition-transform duration-300">
              
              {/* Folded Paper Corner Effect at bottom right */}
              <div 
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#E8DFD5] border-t border-l border-[#C79801]/40 shadow-inner"
                style={{
                  clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
                }}
              ></div>

              {/* Top Headline Script */}
              <div className="relative mb-2">
                <div className="inline-block relative">
                  <h4 className="font-serif italic font-medium text-2xl sm:text-3xl text-[#2B1D12] leading-none tracking-tight">
                    Seu pedido<br />chegou!
                  </h4>
                  {/* Yellow mini bubble icon */}
                  <span className="absolute -top-1 -right-4 w-5 h-5 rounded-full bg-[#E1AD01] text-[#2B1D12] flex items-center justify-center text-[10px] font-semibold shadow-2xs">
                    ♥
                  </span>
                </div>
              </div>

              {/* Sub-copy */}
              <p className="text-xs font-medium text-[#4B3621] mb-3">
                Feito com carinho, entregue quentinho!
              </p>

              {/* Instagram Callout */}
              <div className="mb-4">
                <p className="text-[11px] font-medium text-[#8A6700] italic leading-tight">
                  Marque a <span className="font-semibold underline">@sua_loja</span> no insta e ganhe um presente especial
                </p>
              </div>

              {/* White QR Code container box */}
              <div className="mx-auto w-36 h-36 bg-white rounded-xl border border-[#E8DFD5] p-2 flex flex-col items-center justify-center shadow-2xs">
                {/* Visual crisp QR Code graphic */}
                <div className="relative w-24 h-24 bg-[#2B1D12] p-1.5 rounded-lg flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-sm p-1 grid grid-cols-5 gap-0.5">
                    {[...Array(25)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-[1px] ${
                          (i % 2 === 0 || i === 0 || i === 4 || i === 20 || i === 24 || i === 12) 
                            ? 'bg-[#2B1D12]' 
                            : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                  {/* Centered Instagram Camera icon badge in QR */}
                  <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-gradient-to-tr from-[#E1AD01] to-[#C79801] flex items-center justify-center text-white text-[10px] font-semibold shadow-2xs border border-white">
                    📷
                  </div>
                </div>

                <span className="text-[9px] font-semibold tracking-widest text-[#2B1D12] uppercase mt-1.5">
                  @SUA_LOJA_AQUI
                </span>
              </div>

              {/* Bottom Yellow Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#E1AD01]"></div>
            </div>

            <span className="mt-3.5 text-xs sm:text-[13px] text-[#8A6700] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C79801]" />
              Template Oficial 100% Personalizável
            </span>
          </div>

          {/* Right Column: Bonus Value Details & Features */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-[#8A6700] uppercase tracking-wider block">
                INCLUSO GRATUITAMENTE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-[32px] font-medium text-[#2B1D12] leading-tight">
                Mais divulgação gratuita no Instagram
              </h3>
            </div>

            {/* Checklist of what is inside the Bonus */}
            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-sans font-semibold text-sm sm:text-base text-[#2B1D12]">Editável no Canva Gratuito</h5>
                  <p className="text-xs sm:text-sm text-[#5A422D] mt-0.5 leading-relaxed">Troque o @, sua logo e as cores pelo celular ou PC.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-sans font-semibold text-sm sm:text-base text-[#2B1D12]">QR Code para seu Instagram</h5>
                  <p className="text-xs sm:text-sm text-[#5A422D] mt-0.5 leading-relaxed">Leva o cliente direto para o perfil da sua loja.</p>
                </div>
              </div>
            </div>

            {/* Price Anchor for Bonus */}
            <div className="p-4 sm:px-5 sm:py-4 rounded-xl bg-[#F2EBE3] border border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
              <div>
                <span className="text-xs sm:text-[13px] text-[#6B533E] block">Vendido separado por:</span>
                <span className="text-sm sm:text-base font-semibold text-[#D32F2F] line-through">R$ 29,90</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#2E7D32] bg-[#2E7D32]/10 px-3.5 py-1.5 rounded-full whitespace-nowrap">
                GRÁTIS HOJE
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
