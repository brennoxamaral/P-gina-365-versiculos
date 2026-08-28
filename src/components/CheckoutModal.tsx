import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  CheckCircle2,
  QrCode,
  CreditCard,
  ShieldCheck,
  Download,
  Sparkles,
  Copy,
  Check,
  Loader2,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Clock,
  Zap,
  Mail,
  Video,
  ExternalLink,
  FileText,
} from 'lucide-react';
import {
  createPixCharge,
  checkPixStatus,
  simulatePixPayment,
  maskCPF,
  maskPhone,
  isValidCPF,
} from '../services/abacatePay';
import { AbacatePixData } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// FLAG PARA CONTROLE DA OPÇÃO DE CARTÃO:
// Mantemos todo o código e JSX do cartão preservados.
// Para reativar o cartão no futuro, basta alterar esta flag para true.
const SHOW_CARD_PAYMENT = false;

type CheckoutStep = 'FORM' | 'GENERATING' | 'PAYMENT_PENDING' | 'SUCCESS';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  // Estado do método de pagamento (preservado para quando cartão for reativado)
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  
  // Etapa atual do fluxo de checkout
  const [step, setStep] = useState<CheckoutStep>('FORM');
  
  // Dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    taxId: '',
    cellphone: '',
  });

  // Dados do cartão de crédito (preservados)
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  // Dados da cobrança PIX gerada no AbacatePay
  const [pixData, setPixData] = useState<AbacatePixData | null>(null);
  
  // Estados de feedback da UI
  const [copiedPix, setCopiedPix] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Tempo restante em segundos para expiração do PIX (ex: 30 minutos)
  const [timeLeft, setTimeLeft] = useState<number>(1800);

  // Ref para controle do intervalo de polling
  const pollingRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Limpa estados ao fechar ou reabrir
  useEffect(() => {
    if (!isOpen) {
      if (pollingRef.current) clearInterval(pollingRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  // Polling automático para checar pagamento no AbacatePay
  useEffect(() => {
    if (step === 'PAYMENT_PENDING' && pixData?.id) {
      // Inicia timer regressivo
      setTimeLeft(1800);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Inicia polling a cada 3 segundos
      pollingRef.current = setInterval(async () => {
        try {
          const statusResult = await checkPixStatus(pixData.id);
          if (statusResult.status === 'PAID' || statusResult.status === 'APPROVED') {
            if (pollingRef.current) clearInterval(pollingRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
            setStep('SUCCESS');
          } else if (statusResult.status === 'EXPIRED' || statusResult.status === 'CANCELLED') {
            if (pollingRef.current) clearInterval(pollingRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
            setErrorMessage('A cobrança PIX expirou. Gere uma nova para concluir sua compra.');
          }
        } catch (err) {
          // Erros transitórios de rede no polling não devem interromper o fluxo
          console.warn('[CheckoutModal] Polling status check error:', err);
        }
      }, 3000);

      return () => {
        if (pollingRef.current) clearInterval(pollingRef.current);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [step, pixData?.id]);

  if (!isOpen) return null;

  // Formatação do timer regressivo MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Copiar código PIX para a área de transferência
  const handleCopyPix = () => {
    if (!pixData?.brCode) return;
    navigator.clipboard.writeText(pixData.brCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  // Submissão do formulário e geração do PIX
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validação de campos obrigatórios
    if (!formData.name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Por favor, informe um e-mail válido para receber os arquivos.');
      return;
    }

    const cleanTaxId = formData.taxId.replace(/\D/g, '');
    if (cleanTaxId.length !== 11 || !isValidCPF(formData.taxId)) {
      setErrorMessage('Por favor, informe um CPF válido.');
      return;
    }

    const cleanPhone = formData.cellphone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Por favor, informe um WhatsApp/Telefone válido com DDD.');
      return;
    }

    // Se método cartão estiver ativo e selecionado (preservado)
    if (SHOW_CARD_PAYMENT && paymentMethod === 'card') {
      setStep('SUCCESS');
      return;
    }

    // Inicia processo de geração no AbacatePay
    setStep('GENERATING');

    try {
      const charge = await createPixCharge(
        {
          name: formData.name,
          email: formData.email,
          taxId: formData.taxId,
          cellphone: formData.cellphone,
        },
        1990 // R$ 19,90 em centavos
      );

      setPixData(charge);
      setStep('PAYMENT_PENDING');
    } catch (error: any) {
      console.error('[Checkout] Falha ao criar PIX:', error);
      setErrorMessage(
        error.message || 'Não foi possível gerar a chave PIX no momento. Verifique seus dados e tente novamente.'
      );
      setStep('FORM');
    }
  };

  // Simular pagamento em ambiente DEV (Sandbox)
  const handleSimulateDevPayment = async () => {
    if (!pixData?.id) return;
    setIsSimulating(true);
    try {
      await simulatePixPayment(pixData.id);
      if (pollingRef.current) clearInterval(pollingRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      setStep('SUCCESS');
    } catch (error: any) {
      console.error('[Checkout] Erro ao simular pagamento:', error);
      // Fallback para aprovação local de demonstração
      setStep('SUCCESS');
    } finally {
      setIsSimulating(false);
    }
  };

  // Voltar para edição dos dados
  const handleBackToForm = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setStep('FORM');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF6F0] rounded-3xl border-2 border-[#E1AD01] shadow-2xl overflow-hidden p-6 sm:p-8 text-[#4B3621] max-h-[92vh] overflow-y-auto">
        
        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#6B533E] hover:bg-[#F2EBE3] hover:text-[#2B1D12] transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ------------------------------------------------------------------ */}
        {/* ETAPA 1: FORMULÁRIO DE DADOS DO COMPRADOR                          */}
        {/* ------------------------------------------------------------------ */}
        {step === 'FORM' && (
          <div>
            {/* Cabeçalho */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1AD01]/20 text-xs font-bold text-[#8A6700] mb-2">
                <Lock className="w-3 h-3 text-[#2E7D32]" />
                <span>CHECKOUT SEGURO SSL 256-BIT • ABACATEPAY</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2B1D12]">
                Finalize seu Pedido
              </h3>
              <p className="text-xs text-[#6B533E]">
                Kit 365 Versículos + Bônus Cartão de Agradecimento Canva
              </p>
            </div>

            {/* Resumo do Pedido */}
            <div className="p-4 rounded-xl bg-[#F2EBE3] border border-[#E8DFD5] mb-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#2B1D12] block">Valor Total:</span>
                <span className="text-[11px] text-[#6B533E]">Acesso vitalício • Pagamento único</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl font-extrabold text-[#2B1D12]">R$ 19,90</span>
              </div>
            </div>

            {/* Seletor de Método de Pagamento */}
            {/* NOTA: A aba de cartão de crédito é mantida no código e exibida apenas se SHOW_CARD_PAYMENT = true */}
            {SHOW_CARD_PAYMENT ? (
              <div className="grid grid-cols-2 gap-3 mb-5">
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
            ) : (
              /* Destaque Exclusivo do PIX */
              <div className="mb-5 p-3 rounded-xl bg-[#FAF3E8] border border-[#E1AD01]/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E1AD01] text-[#2B1D12] flex items-center justify-center shrink-0 shadow-xs">
                  <QrCode className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2B1D12]">Pagamento via PIX</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#2E7D32]/15 text-[#2E7D32]">
                      LIBERAÇÃO IMEDIATA
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B533E]">
                    Gere o QR Code e copie a chave em 1 clique.
                  </p>
                </div>
              </div>
            )}

            {/* Mensagem de Erro se houver */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Formulário com todos os dados exigidos pelo AbacatePay */}
            <form onSubmit={handleSubmitForm} className="space-y-3.5">
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-base sm:text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801] shadow-xs"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-base sm:text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801] shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2B1D12] mb-1">
                    CPF (Exigido para PIX) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={14}
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: maskCPF(e.target.value) })}
                    placeholder="000.000.000-00"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-base sm:text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801] shadow-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1D12] mb-1">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    value={formData.cellphone}
                    onChange={(e) => setFormData({ ...formData, cellphone: maskPhone(e.target.value) })}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-base sm:text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801] shadow-xs"
                  />
                </div>
              </div>

              {/* CÓDIGO DO CARTÃO DE CRÉDITO (PRESERVADO PARA QUANDO FOR REATIVADO) */}
              {SHOW_CARD_PAYMENT && paymentMethod === 'card' && (
                <div className="space-y-3 pt-2 border-t border-[#E8DFD5]">
                  <div>
                    <label className="block text-xs font-bold text-[#2B1D12] mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2B1D12] mb-1">Validade</label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        placeholder="MM/AA"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-sm text-[#2B1D12] focus:outline-none focus:border-[#C79801]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B1D12] mb-1">CVV</label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
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
                <Sparkles className="w-5 h-5 text-[#2B1D12]" />
                <span>GERAR PIX PARA PAGAMENTO • R$ 19,90</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B533E] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Garantia de 7 dias com devolução integral</span>
              </div>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* ETAPA 2: GERANDO COBRANÇA (LOADING)                                */}
        {/* ------------------------------------------------------------------ */}
        {step === 'GENERATING' && (
          <div className="text-center py-12 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#E1AD01]/20 text-[#8A6700] flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-xl font-bold text-[#2B1D12]">
                Conectando ao AbacatePay...
              </h4>
              <p className="text-xs text-[#6B533E] max-w-xs mx-auto">
                Estamos gerando seu QR Code e código PIX exclusivo para liberação imediata.
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* ETAPA 3: PAGAMENTO PIX PENDENTE (QR CODE + COPIA E COLA)           */}
        {/* ------------------------------------------------------------------ */}
        {step === 'PAYMENT_PENDING' && pixData && (
          <div className="space-y-5 animate-fadeIn">
            {/* Header da Tela de Pagamento */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleBackToForm}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#6B533E] hover:text-[#2B1D12] mb-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Alterar dados</span>
              </button>
              <h3 className="font-serif text-2xl font-bold text-[#2B1D12]">
                Pague com PIX para Liberar
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mt-1">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>Expira em: {formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Imagem do QR Code Gerado */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs text-center space-y-3">
              {pixData.brCodeBase64 ? (
                <img
                  src={pixData.brCodeBase64}
                  alt="QR Code PIX AbacatePay"
                  className="w-48 h-48 sm:w-52 sm:h-52 mx-auto rounded-xl border border-[#E8DFD5] object-contain p-1.5 bg-white shadow-xs"
                />
              ) : (
                <div className="w-48 h-48 sm:w-52 sm:h-52 mx-auto rounded-xl bg-[#FAF6F0] border border-dashed border-[#E1AD01] flex flex-col items-center justify-center p-4 text-center">
                  <QrCode className="w-12 h-12 text-[#8A6700] mb-2" />
                  <span className="text-xs font-bold text-[#2B1D12]">PIX Copia e Cola Gerado</span>
                  <span className="text-[10px] text-[#6B533E]">Copie o código abaixo no app do banco</span>
                </div>
              )}

              <div className="text-xs text-[#6B533E] space-y-1">
                <p className="font-semibold text-[#2B1D12]">
                  1. Abra o aplicativo do seu banco
                </p>
                <p>2. Escolha pagar via PIX e aponte a câmera ou use o Copia e Cola:</p>
              </div>

              {/* Caixa Copia e Cola com Botão */}
              {pixData.brCode && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 p-2 bg-[#F2EBE3] rounded-xl border border-[#E8DFD5] text-xs font-mono text-[#5A422D] overflow-hidden text-left">
                    <span className="truncate flex-1 select-all font-mono text-[11px]">
                      {pixData.brCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="w-full py-3 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] text-[#2B1D12] font-black text-xs tracking-wide shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-4 h-4 text-[#2E7D32]" />
                        <span>CHAVE PIX COPIADA COM SUCESSO!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPIAR CÓDIGO PIX (COPIA E COLA)</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Indicador de Status em Tempo Real */}
            <div className="p-3.5 rounded-xl bg-[#FAF3E8] border border-[#E1AD01]/50 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E1AD01] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C79801]"></span>
                </span>
                <div className="min-w-0">
                  <span className="font-bold text-[#2B1D12] block">Aguardando pagamento...</span>
                  <span className="text-[10px] text-[#6B533E] truncate block">
                    A liberação dos arquivos é 100% automática após o pagamento.
                  </span>
                </div>
              </div>
              <RefreshCw className="w-4 h-4 text-[#8A6700] animate-spin shrink-0" />
            </div>

            {/* BOTÃO EXCLUSIVO DE TESTE EM MODO DEV (SANDBOX) - Some automaticamente em produção */}
            {pixData.devMode && (
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={handleSimulateDevPayment}
                  disabled={isSimulating}
                  className="w-full py-2 px-3 rounded-lg bg-white/80 hover:bg-white border border-[#E8DFD5] text-[#8A6700] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isSimulating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Aprovando no AbacatePay (DEV)...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>⚡ Simular Pagamento Aprovado (Ambiente DEV)</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* ETAPA 4: SUCESSO E DOWNLOAD IMEDIATO                               */}
        {/* ------------------------------------------------------------------ */}
        {step === 'SUCCESS' && (
          <div className="text-center py-4 space-y-4 animate-fadeIn">
            {/* Ícone de Sucesso */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            {/* Título e Subtítulo */}
            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D12]">
                Parabéns! Pagamento Confirmado
              </h3>
              <p className="text-xs sm:text-sm text-[#5A422D]">
                Seu acesso ao <strong className="text-[#2B1D12]">Kit 365 Versículos para Delivery</strong> e bônus está 100% liberado!
              </p>
            </div>

            {/* Aviso de Envio para o E-mail */}
            <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#A5D6A7] text-left flex items-start gap-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[#1B5E20]">
                    Todos os materiais foram enviados para o seu e-mail!
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#2E7D32] text-white">
                    ENVIO AUTOMÁTICO
                  </span>
                </div>
                <p className="text-xs text-[#2E7D32] mt-1">
                  Enviamos todos os links de acesso e arquivos diretamente para{' '}
                  <strong className="text-[#1B5E20] font-bold underline decoration-green-400 underline-offset-2 break-all">
                    {formData.email.trim() || 'o e-mail informado no pagamento'}
                  </strong>
                  . Verifique sua caixa de entrada e também a pasta de spam.
                </p>
              </div>
            </div>

            {/* Caixa com os Materiais e Botões de Acesso Imediato */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F2EBE3] border border-[#E8DFD5] space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8A6700] uppercase tracking-wider block">
                  Acesso Imediato aos Materiais:
                </span>
                <span className="text-[10px] text-[#6B533E] font-medium">
                  Clique para baixar ou acessar
                </span>
              </div>

              {/* 1. PDF Kit 365 Versículos */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-white rounded-xl border border-[#E8DFD5] hover:border-[#E1AD01] transition-all gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF3E8] border border-[#E1AD01]/30 text-[#8A6700] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs sm:text-sm text-[#2B1D12] truncate">
                      Kit 365 Versículos (PDF Alta Resolução)
                    </h5>
                    <p className="text-[10px] sm:text-[11px] text-[#6B533E]">
                      Arquivo PDF Vetorial em 300 DPI pronto para imprimir
                    </p>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1Vz7G3yHps-yLjbbxvS6_NDMxvLntxhGX/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-xl bg-[#E1AD01] hover:bg-[#C79801] active:scale-95 text-[#2B1D12] font-black text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>

              {/* 2. Template Cartão de Agradecimento Canva */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-white rounded-xl border border-[#E8DFD5] hover:border-[#E1AD01] transition-all gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF3E8] border border-[#E1AD01]/30 text-[#8A6700] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs sm:text-sm text-[#2B1D12] truncate">
                      Template Cartão de Agradecimento
                    </h5>
                    <p className="text-[10px] sm:text-[11px] text-[#6B533E]">
                      Bônus oficial 100% editável no Canva gratuito ou Pro
                    </p>
                  </div>
                </div>
                <a
                  href="https://canva.link/cartao-de-agradecimento-estrategico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-xl bg-[#2B1D12] hover:bg-black active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E1AD01]" />
                  <span>Abrir Template Canva</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>

              {/* 3. Vídeo Aula Template Canva */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-white rounded-xl border border-[#E8DFD5] hover:border-[#E1AD01] transition-all gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs sm:text-sm text-[#2B1D12] truncate">
                      Vídeo Aula: Como Editar no Canva
                    </h5>
                    <p className="text-[10px] sm:text-[11px] text-[#6B533E]">
                      Passo a passo prático para personalizar e imprimir
                    </p>
                  </div>
                </div>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-xs cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Assistir Vídeo Aula</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                // Resetar após fechar para permitir nova abertura limpa
                setStep('FORM');
                setPixData(null);
              }}
              className="w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] text-[#2B1D12] font-bold text-xs hover:bg-[#F2EBE3] transition-colors cursor-pointer"
            >
              Concluir e Fechar
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
