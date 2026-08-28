import { Router, Request, Response } from 'express';
import { verifyAbacateSignature, verifyWebhookSecret } from '../security/signature';
import { idempotency } from '../services/idempotency';
import { emailService } from '../services/emailService';

export const webhookRouter = Router();

interface CustomRequest extends Request {
  rawBody?: string | Buffer;
}

/**
 * Endpoint de Webhook da AbacatePay
 * POST /api/webhook/abacatepay?webhookSecret=...
 */
webhookRouter.post('/abacatepay', async (req: CustomRequest, res: Response) => {
  const secretFromQuery = req.query.webhookSecret as string | undefined;
  const signatureFromHeader = req.headers['x-webhook-signature'] as string | undefined;
  const rawBody = req.rawBody || JSON.stringify(req.body);

  console.log(`\n[Webhook] Recebida notificação da AbacatePay às ${new Date().toISOString()}`);

  // 1. Validação de Segurança: Secret na Query String
  if (secretFromQuery && !verifyWebhookSecret(secretFromQuery)) {
    console.warn('[Webhook] Secret inválido na URL:', secretFromQuery);
    return res.status(401).json({ error: 'Unauthorized: Secret inválido' });
  }

  // 2. Validação de Segurança: Assinatura HMAC no Header
  if (signatureFromHeader) {
    const isValidSignature = verifyAbacateSignature(rawBody, signatureFromHeader);
    if (!isValidSignature) {
      console.warn('[Webhook] Assinatura HMAC-SHA256 inválida:', signatureFromHeader);
      return res.status(401).json({ error: 'Unauthorized: Assinatura HMAC inválida' });
    }
  } else {
    console.warn('[Webhook] Aviso: Header X-Webhook-Signature não informado. Prosseguindo com validação de secret.');
  }

  // 3. Leitura do corpo do evento
  const payload = req.body;
  if (!payload || !payload.event) {
    console.warn('[Webhook] Payload vazio ou sem propriedade event');
    return res.status(400).json({ error: 'Bad Request: Payload inválido' });
  }

  const eventType: string = payload.event;
  const eventId: string = payload.id || `evt_${Date.now()}`;
  console.log(`[Webhook] Evento identificado: "${eventType}" (ID: ${eventId})`);

  // Filtra apenas eventos de pagamento aprovado
  const isTransparentCompleted = eventType === 'transparent.completed';
  const isCheckoutCompleted = eventType === 'checkout.completed';

  if (!isTransparentCompleted && !isCheckoutCompleted) {
    console.log(`[Webhook] Evento "${eventType}" ignorado (não é confirmação de pagamento).`);
    return res.status(200).json({ ok: true, message: `Evento ${eventType} ignorado com sucesso.` });
  }

  // Extração dos dados do comprador e do pedido
  const data = payload.data || {};
  const customer = data.customer || {};
  const transparent = data.transparent || {};
  const checkout = data.checkout || {};
  const payerInfo = data.payerInformation || {};

  const orderId = transparent.id || checkout.id || eventId;
  const customerName = customer.name || payerInfo.PIX?.name || payerInfo.BOLETO?.name || 'Cliente';
  const customerEmail = customer.email?.trim();
  const amountInCents = transparent.amount || checkout.amount || 1990;
  const paymentMethod = payerInfo.method || (transparent.methods && transparent.methods[0]) || 'PIX';

  if (!customerEmail) {
    console.warn('[Webhook] E-mail do cliente não encontrado no payload. Dados:', JSON.stringify(data));
    return res.status(200).json({
      ok: true,
      warning: 'E-mail não localizado no payload, notificação não pôde ser entregue.',
    });
  }

  // 4. Controle de Idempotência (Evita envios duplicados em caso de retentativas)
  const uniqueKey = `${orderId}_${customerEmail}`;
  if (idempotency.has(uniqueKey) || idempotency.has(eventId)) {
    console.log(`[Webhook] Cobrança/Evento já processado anteriormente (${uniqueKey}). Respondendo 200 OK.`);
    return res.status(200).json({
      ok: true,
      idempotent: true,
      message: 'Evento já processado anteriormente.',
    });
  }

  // 5. Envio do E-mail com os materiais
  try {
    console.log(`[Webhook] Disparando e-mail de entrega para ${customerName} (${customerEmail})...`);
    
    const emailResult = await emailService.sendDeliveryEmail({
      customerName,
      customerEmail,
      orderId,
      amountInCents,
      paymentMethod,
    });

    // Registra no gerenciador de idempotência
    idempotency.markAsProcessed(uniqueKey, customerEmail);
    if (eventId) idempotency.markAsProcessed(eventId, customerEmail);

    console.log(`[Webhook] Processamento concluído com sucesso para ${customerEmail}!`);

    return res.status(200).json({
      success: true,
      message: 'Pagamento processado e e-mail de entrega enviado com sucesso.',
      delivery: emailResult,
    });
  } catch (error: any) {
    console.error('[Webhook] Falha ao processar e enviar e-mail:', error);
    // Retorna 500 para a AbacatePay reter se houve falha temporária
    return res.status(500).json({
      error: 'Internal Server Error ao processar webhook',
      message: error.message,
    });
  }
});
