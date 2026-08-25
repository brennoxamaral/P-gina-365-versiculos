import React, { useState } from 'react';
import { X, Lock, CheckCircle2, QrCode, CreditCard, ShieldCheck, Download, Sparkles, Copy, Check, Heart } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  if (!isOpen) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136batatamania365versiculos@pagamento.com520400005303986540519.905802BR5925BATATA MANIA DELIVERY6009SAO PAULO62070503***6304E8F2');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF6F0] rounded-3xl border-2 border-[#E1AD01] shadow-2xl overflow-hidden p-6 sm:p-8 text-[#4B3621] max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#6B533E] hover:bg-[#F2EBE3] hover:text-[#2B1D12] transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1AD01]/20 text-xs font-bold text-[#8A6700] mb-2">
                <Lock className="w-3 h-3 text-[#2E7D32]" />
                <span>CHECKOUT SEGURO SSL 256-BIT</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2B1D12]">
                Finalize seu Pedido
              </h3>
              <p className="text-xs text-[#6B533E]">
                Kit 365 Versículos + Bônus Cartão de Agradecimento Canva
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 rounded-xl bg-[#F2EBE3] border border-[#E8DFD5] mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#2B1D12] block">Valor Total:</span>
                <span className="text-[11px] text-[#6B533E]">Acesso vitalício • Pagamento único</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl font-extrabold text-[#2B1D12]">R$ 19,90</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'bg-[#E1AD01] text-[#2B1D12] border-[#C79801] shadow-xs'
                    : 'bg-[#FAF6F0] text-[#6B533E] border-[#E8DFD5] hover:bg-[#F2EBE3]'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>PIX (Instantâneo)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-[#E1AD01] text-[#2B1D12] border-[#C79801] shadow-xs'
                    : 'bg-[#FAF6F0] text-[#6B533E] border-[#E8DFD5] hover:bg-[#F2EBE3]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cartão de Crédito</span>
              </button>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSimulatePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2B1D12] mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: João da Silva"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B1D12] mb-1">
                  Seu Melhor E-mail (Para receber o PDF) *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seuemail@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801]"
                />
              </div>

              {paymentMethod === 'pix' ? (
                /* PIX Box */
                <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] text-center space-y-3">
                  <span className="text-xs font-bold text-[#2E7D32] flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Chave PIX Copia e Cola Gerada
                  </span>
                  
                  <div className="flex items-center gap-2 p-2 bg-[#F2EBE3] rounded-lg border border-[#E8DFD5] text-xs font-mono text-[#5A422D] overflow-hidden">
                    <span className="truncate flex-1">00020126580014br.gov.bcb.pix0136batatamania...</span>
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-2.5 py-1 rounded bg-[#E1AD01] text-[#2B1D12] font-bold text-[11px] hover:bg-[#C79801] flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      {copiedPix ? <Check className="w-3 h-3 text-[#2E7D32]" /> : <Copy className="w-3 h-3" />}
                      {copiedPix ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#6B533E]">
                    Abra o app do seu banco e pague via PIX Copia e Cola. O envio é 100% automático.
                  </p>
                </div>
              ) : (
                /* Card Simulation Inputs */
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2B1D12] mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2B1D12] mb-1">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B1D12] mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                id="btn-confirm-payment"
                className="w-full py-4 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] text-[#2B1D12] font-black text-base tracking-tight shadow-gold transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Download className="w-5 h-5" />
                <span>CONFIRMAR E LIBERAR DOWNLOAD • R$ 19,90</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B533E] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Garantia de 7 dias com devolução integral</span>
              </div>
            </form>
          </div>
        ) : (
          /* Payment Success & Instant Download View */
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D12]">
                Parabéns! Pagamento Confirmado
              </h3>
              <p className="text-sm text-[#5A422D]">
                Seu acesso ao <strong className="text-[#2B1D12]">Kit 365 Versículos para Delivery</strong> já está liberado!
              </p>
            </div>

            {/* Download Links Box */}
            <div className="p-5 rounded-2xl bg-[#F2EBE3] border border-[#E8DFD5] space-y-3 text-left">
              <span className="text-xs font-bold text-[#8A6700] uppercase tracking-wider block">
                Seus Arquivos Prontos para Download:
              </span>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#E8DFD5]">
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-[#C79801]" />
                  <div>
                    <h5 className="font-bold text-xs text-[#2B1D12]">Kit_365_Versiculos_A4_HD.pdf</h5>
                    <p className="text-[10px] text-[#6B533E]">Arquivo PDF Vetorial em 300 DPI</p>
                  </div>
                </div>
                <a
                  href="#download-pdf"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Download iniciado com sucesso! O arquivo PDF foi enviado para o seu e-mail.");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#E1AD01] text-[#2B1D12] font-bold text-xs hover:bg-[#C79801]"
                >
                  Baixar PDF
                </a>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#E8DFD5]">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C79801]" />
                  <div>
                    <h5 className="font-bold text-xs text-[#2B1D12]">Template_Cartao_Canva.link</h5>
                    <p className="text-[10px] text-[#6B533E]">Link de Acesso Editável no Canva</p>
                  </div>
                </div>
                <a
                  href="https://canva.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#2B1D12] text-white font-bold text-xs hover:bg-black"
                >
                  Abrir no Canva
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] text-[#2B1D12] font-bold text-xs hover:bg-[#F2EBE3]"
            >
              Fechar Janela
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
