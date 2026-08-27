import { AbacateCustomer, AbacatePixData, AbacatePixCheckResponse } from '../types';

// Chave da API (lida do .env ou fallback seguro para DEV)
const API_KEY =
  (import.meta as any).env?.VITE_ABACATEPAY_API_KEY ||
  (import.meta as any).env?.ABACATEPAY_API_KEY ||
  'abc_dev_Tt2r4sBqGkezgsJyWbsrAqta';

const BASE_URL = 'https://api.abacatepay.com/v2';

/**
 * Cria uma cobrança transparente via PIX no AbacatePay
 * @param customer Dados do comprador (Nome, Email, CPF, Celular)
 * @param amountInCents Valor em centavos (ex: 1990 para R$ 19,90)
 */
export async function createPixCharge(
  customer: AbacateCustomer,
  amountInCents: number = 1990
): Promise<AbacatePixData> {
  const cleanTaxId = customer.taxId.replace(/\D/g, '');
  const cleanPhone = customer.cellphone.replace(/\D/g, '');

  const payload = {
    method: 'PIX',
    data: {
      amount: amountInCents,
      description: 'Kit 365 Versículos para Delivery + Bônus Canva',
      expiresIn: 1800, // 30 minutos de validade
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        taxId: cleanTaxId,
        cellphone: cleanPhone,
      },
      metadata: {
        productId: 'kit-365-versiculos',
        productName: 'Kit 365 Versículos para Embalagens de Delivery',
        timestamp: new Date().toISOString(),
      },
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/transparents/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      const errorMsg =
        result.error ||
        result.message ||
        `Erro ${response.status}: Falha ao gerar cobrança PIX no AbacatePay.`;
      throw new Error(errorMsg);
    }

    if (!result.data) {
      throw new Error('Resposta inválida do AbacatePay: dados do PIX não encontrados.');
    }

    return result.data as AbacatePixData;
  } catch (error: any) {
    console.error('[AbacatePay] Erro ao criar cobrança PIX:', error);
    throw error;
  }
}

/**
 * Consulta o status de pagamento do QR Code PIX
 * @param chargeId Identificador único da cobrança transparente (ex: pix_char_...)
 */
export async function checkPixStatus(chargeId: string): Promise<AbacatePixCheckResponse['data']> {
  try {
    const response = await fetch(`${BASE_URL}/transparents/check?id=${encodeURIComponent(chargeId)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      const errorMsg = result.error || `Erro ${response.status} ao checar status do PIX.`;
      throw new Error(errorMsg);
    }

    return result.data;
  } catch (error: any) {
    console.error('[AbacatePay] Erro ao consultar status do PIX:', error);
    throw error;
  }
}

/**
 * Simula o pagamento de uma cobrança PIX no ambiente de desenvolvimento (Sandbox/devMode)
 * @param chargeId Identificador do PIX
 */
export async function simulatePixPayment(chargeId: string): Promise<AbacatePixData> {
  try {
    const response = await fetch(`${BASE_URL}/transparents/simulate-payment?id=${encodeURIComponent(chargeId)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      const errorMsg = result.error || `Erro ${response.status} ao simular pagamento.`;
      throw new Error(errorMsg);
    }

    return result.data;
  } catch (error: any) {
    console.error('[AbacatePay] Erro ao simular pagamento:', error);
    throw error;
  }
}

// ----------------------------------------------------
// Funções Utilitárias para Formatação e Validação
// ----------------------------------------------------

/**
 * Aplica máscara de CPF: 000.000.000-00
 */
export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

/**
 * Aplica máscara de Telefone/WhatsApp: (00) 00000-0000 ou (00) 0000-0000
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length > 0 ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Validação simplificada de CPF (verifica tamanho e dígitos repetidos)
 */
export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  let sum = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(digits.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(digits.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.substring(10, 11))) return false;

  return true;
}
