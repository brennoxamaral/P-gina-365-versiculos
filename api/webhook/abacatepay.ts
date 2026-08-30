import { verifyAbacateSignature, verifyWebhookSecret } from '../../server/security/signature';
import { idempotency } from '../../server/services/idempotency';
import { emailService } from '../../server/services/emailService';

/**
 * Webhook Serverless Endpoint para Vercel
 * POST /api/webhook/abacatepay?webhookSecret=...
 */
export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  // Suporte a GET para verificação rápida de status no navegador
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'active',
      message: 'Endpoint de webhook da AbacatePay está ativo e pronto para receber requisições POST.',
      timestamp: new Date().toISOString(),
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const secretFromQuery = (req.query?.webhookSecret as string | undefined) || undefined;
  const signatureFromHeader = (req.headers?.['x-webhook-signature'] as string | undefined) || undefined;

  console.log(`\n[Webhook] Notificação recebida da AbacatePay às ${new Date().toISOString()}`);

  // 1. Obtenção do corpo da requisição de forma segura
  let bodyPayload = req.body;
  let rawBody: string = '';

  if (typeof bodyPayload === 'string') {
    rawBody = bodyPayload;
    try {
      bodyPayload = JSON.parse(bodyPayload);
    } catch {
      // Se não for JSON válido, segue como string
    }
  } else if (Buffer.isBuffer(bodyPayload)) {
    rawBody = bodyPayload.toString('utf8');
    try {
      bodyPayload = JSON.parse(rawBody);
    } catch {
      // continua
    }
  } else if (bodyPayload && typeof bodyPayload === 'object') {
    rawBody = JSON.stringify(bodyPayload);
  }

  // 2. Validação de Segurança: Secret na Query String
  if (secretFromQuery && !verifyWebhookSecret(secretFromQuery)) {
    console.warn('[Webhook] Secret inválido na URL:', secretFromQuery);
    return res.status(401).json({ error: 'Unauthorized: Secret inválido' });
  }

  // 3. Validação de Segurança: Assinatura HMAC no Header
  if (signatureFromHeader) {
    const isValidSignature = verifyAbacateSignature(rawBody, signatureFromHeader);
    if (!isValidSignature) {
      console.warn('[Webhook] Assinatura HMAC-SHA256 inválida:', signatureFromHeader);
      return res.status(401).json({ error: 'Unauthorized: Assinatura HMAC inválida' });
    }
  } else {
    console.warn('[Webhook] Aviso: Header X-Webhook-Signature não informado. Prosseguindo com validação de secret.');
  }

  // 4. Leitura do evento
  if (!bodyPayload || !bodyPayload.event) {
    console.warn('[Webhook] Payload vazio ou sem propriedade event');
    return res.status(400).json({ error: 'Bad Request: Payload inválido' });
  }

  const eventType: string = bodyPayload.event;
  const eventId: string = bodyPayload.id || `evt_${Date.now()}`;
  console.log(`[Webhook] Evento identificado: "${eventType}" (ID: ${eventId})`);

  // Filtra apenas eventos de pagamento aprovado
  const isTransparentCompleted = eventType === 'transparent.completed';
  const isCheckoutCompleted = eventType === 'checkout.completed';

  if (!isTransparentCompleted && !isCheckoutCompleted) {
    console.log(`[Webhook] Evento "${eventType}" ignorado (não é confirmação de pagamento).`);
    return res.status(200).json({ ok: true, message: `Evento ${eventType} ignorado com sucesso.` });
  }

  // Extração dos dados do comprador e do pedido
  const data = bodyPayload.data || {};
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

  // 5. Controle de Idempotência (Evita envios duplicados)
  const uniqueKey = `${orderId}_${customerEmail}`;
  if (idempotency.has(uniqueKey) || idempotency.has(eventId)) {
    console.log(`[Webhook] Cobrança/Evento já processado anteriormente (${uniqueKey}). Respondendo 200 OK.`);
    return res.status(200).json({
      ok: true,
      idempotent: true,
      message: 'Evento já processado anteriormente.',
    });
  }

  // 6. Envio do E-mail com os materiais
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
    return res.status(500).json({
      error: 'Internal Server Error ao processar webhook',
      message: error.message,
    });
  }
}
