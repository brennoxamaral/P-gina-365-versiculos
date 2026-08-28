import crypto from 'node:crypto';
import { config } from '../config';

/**
 * Valida a assinatura HMAC-SHA256 enviada pela AbacatePay no header `X-Webhook-Signature`.
 *
 * @param rawBody Corpo original e não parseado da requisição HTTP (string ou Buffer).
 * @param signatureFromHeader Valor presente no header `x-webhook-signature`.
 * @returns boolean indicando se a assinatura é válida e autêntica.
 */
export function verifyAbacateSignature(rawBody: string | Buffer, signatureFromHeader?: string): boolean {
  if (!signatureFromHeader) {
    return false;
  }

  try {
    const rawBuffer = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody, 'utf8');

    // Calcula HMAC-SHA256 sobre o raw body usando a chave pública da AbacatePay
    const expectedSig = crypto
      .createHmac('sha256', config.abacate.publicKey)
      .update(rawBuffer)
      .digest('base64');

    const expectedBuffer = Buffer.from(expectedSig, 'utf8');
    const headerBuffer = Buffer.from(signatureFromHeader.trim(), 'utf8');

    // timingSafeEqual previne timing attacks. É necessário checar o comprimento antes para não disparar exceção.
    if (expectedBuffer.length !== headerBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, headerBuffer);
  } catch (error) {
    console.error('[Security] Erro ao validar assinatura HMAC:', error);
    return false;
  }
}

/**
 * Valida o parâmetro secreto na query string (ex: ?webhookSecret=...).
 *
 * @param secretFromQuery Valor recebido na query string da requisição.
 * @returns boolean indicando se o secret coincide com o configurado.
 */
export function verifyWebhookSecret(secretFromQuery?: string): boolean {
  if (!secretFromQuery) {
    return false;
  }

  // Se não foi definido um secret específico em produção, usamos o default
  const configuredSecret = config.abacate.webhookSecret;
  if (!configuredSecret) {
    return true;
  }

  try {
    const a = Buffer.from(secretFromQuery.trim(), 'utf8');
    const b = Buffer.from(configuredSecret.trim(), 'utf8');

    if (a.length !== b.length) {
      return false;
    }

    return crypto.timingSafeEqual(a, b);
  } catch {
    return secretFromQuery === configuredSecret;
  }
}
