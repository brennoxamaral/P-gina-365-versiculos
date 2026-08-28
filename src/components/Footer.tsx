import React from 'react';
import { Heart, ShieldCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B1D12] text-[#D3C5B4] pt-12 pb-28 sm:pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#3B291A]">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#C79801]">
            <Heart className="w-4 h-4 fill-[#E1AD01] text-[#C79801]" />
          </div>
          <span className="font-serif font-bold text-lg text-white">
            Batata Mania • Kit 365 Versículos
          </span>
        </div>

        {/* Security badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#E8DFD5]">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#E1AD01]" /> Ambiente Criptografado SSL 256 bits
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" /> Garantia de Satisfação de 7 Dias
          </span>
        </div>

        {/* Disclaimer / Legal Text */}
        <p className="text-xs text-[#A89887] max-w-2xl leading-relaxed">
          Este produto digital é comercializado para fins de capacitação e fidelização de clientes em estabelecimentos gastronômicos e de delivery. Os resultados podem variar de acordo com o segmento, atendimento e qualidade do seu estabelecimento. Todos os direitos reservados.
        </p>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#3B291A] w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A6B] gap-2">
          <span>© {new Date().getFullYear()} Batata Mania. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <a href="#termos" className="hover:text-white transition-colors">Termos de Uso</a>
            <span>•</span>
            <a href="#privacidade" className="hover:text-white transition-colors">Política de Privacidade</a>
            <span>•</span>
            <a href="#duvidas" className="hover:text-white transition-colors">Central de Ajuda</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
