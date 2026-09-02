import { verifyAbacateSignature, verifyWebhookSecret } from '../security/signature';
import { idempotency } from './idempotency';
import { emailService } from './emailService';
import { config } from '../config';

export interface WebhookResult {
  statusCode: number;
  data: Record<string, any>;
}

/**
 * Processador central e unificado de Webhooks da AbacatePay
 * Funciona tanto em Serverless (Vercel) quanto em Express tradicional (Local)
 */
export async function processAbacateWebhook(
  method: string,
  query: Record<string, any> = {},
  headers: Record<string, any> = {},
  body: any = {}
): Promise<WebhookResult> {
  // 1. Resposta para requisições GET (verificação de status)
  if (method === 'GET' || method === 'HEAD') {
    return {
      statusCode: 200,
      data: {
        status: 'active',
        service: 'Batata Mania - Kit 365 Versículos Webhook Service',
        message: 'Endpoint de webhook da AbacatePay está ativo e pronto para receber requisições POST.',
        timestamp: new Date().toISOString(),
      },
    };
  }

  if (method !== 'POST') {
    return {
      statusCode: 405,
      data: { error: 'Method Not Allowed', message: 'Apenas POST ou GET são aceitos neste endpoint.' },
    };
  }

  console.log(`\n============================================================`);
  console.log(`[Webhook] Notificação recebida da AbacatePay às ${new Date().toISOString()}`);

  try {
    // 2. Extração segura do corpo da requisição
    let bodyPayload = body;
    let rawBody: string = '';

    if (typeof bodyPayload === 'string') {
      rawBody = bodyPayload;
      try {
        bodyPayload = JSON.parse(bodyPayload);
      } catch {
        // mantém string
      }
    } else if (Buffer.isBuffer(bodyPayload)) {
      rawBody = bodyPayload.toString('utf8');
      try {
        bodyPayload = JSON.parse(rawBody);
      } catch {
        // mantém
      }
    } else if (bodyPayload && typeof bodyPayload === 'object') {
      rawBody = JSON.stringify(bodyPayload);
    }

    const secretFromQuery = (query.webhookSecret as string | undefined) || undefined;
    const signatureFromHeader =
      (headers['x-webhook-signature'] as string | undefined) ||
      (headers['X-Webhook-Signature'] as string | undefined) ||
      undefined;

    // 3. Validação de Segurança (Secret na URL ou Assinatura HMAC)
    const hasSecret = Boolean(secretFromQuery);
    const hasSignature = Boolean(signatureFromHeader);

    let isAuthorized = false;

    if (hasSecret && verifyWebhookSecret(secretFromQuery)) {
      isAuthorized = true;
      console.log('[Webhook] Autenticação confirmada via webhookSecret na URL.');
    } else if (hasSignature && verifyAbacateSignature(rawBody, signatureFromHeader)) {
      isAuthorized = true;
      console.log('[Webhook] Autenticação confirmada via header X-Webhook-Signature.');
    } else if (!hasSecret && !hasSignature) {
      // Se nenhum dos dois foi enviado, aceitamos se não houver segredo estrito configurado ou registramos aviso
      console.warn('[Webhook] Aviso: Nenhuma assinatura ou secret foi informada. Processando evento em modo de compatibilidade.');
      isAuthorized = true;
    } else {
      console.warn('[Webhook] Falha de autenticação. Secret ou Assinatura inválidos.');
      return {
        statusCode: 401,
        data: { error: 'Unauthorized', message: 'Secret ou Assinatura HMAC inválidos.' },
      };
    }

    // 4. Validação e Normalização do Evento
    const rawEvent =
      bodyPayload?.event ||
      bodyPayload?.type ||
      bodyPayload?.eventType ||
      bodyPayload?.event_type ||
      bodyPayload?.action ||
      bodyPayload?.name ||
      bodyPayload?.data?.event ||
      bodyPayload?.data?.status ||
      bodyPayload?.status;

    // Se o payload for de teste/verificação/ping ou vazio (ao criar webhook na AbacatePay)
    if (
      !rawEvent ||
      rawEvent === 'ping' ||
      rawEvent === 'test' ||
      rawEvent === 'webhook.test' ||
      rawEvent === 'webhook.created' ||
      rawEvent === 'webhook.verify' ||
      rawEvent === 'healthcheck'
    ) {
      console.log('[Webhook] Ping/Teste ou verificação de webhook recebido com sucesso:', bodyPayload);
      return {
        statusCode: 200,
        data: {
          ok: true,
          status: 'active',
          message: 'Webhook da AbacatePay validado e ativo com sucesso.',
        },
      };
    }

    const eventType: string = String(rawEvent).toLowerCase().trim();
    const eventId: string = bodyPayload.id || `evt_${Date.now()}`;
    console.log(`[Webhook] Evento identificado: "${eventType}" (ID: ${eventId})`);

    // Eventos que representam pagamento aprovado/concluído
    const approvedEvents = [
      'transparent.completed',
      'checkout.completed',
      'billing.paid',
      'billing.completed',
      'charge.completed',
      'charge.paid',
      'pix.completed',
      'payment.completed',
      'paid',
      'completed',
      'subscription.completed',
      'subscription.renewed',
    ];

    const isPaymentApproved =
      approvedEvents.includes(eventType) ||
      bodyPayload?.data?.status === 'PAID' ||
      bodyPayload?.data?.billing?.status === 'PAID';

    if (!isPaymentApproved) {
      console.log(`[Webhook] Evento "${eventType}" recebido (não é confirmação de pagamento). Respondendo 200 OK.`);
      return {
        statusCode: 200,
        data: {
          ok: true,
          message: `Evento "${eventType}" recebido e registrado com sucesso.`,
        },
      };
    }

    // 5. Extração com Tolerância a Falhas dos Dados do Comprador
    const data = bodyPayload.data || {};
    const customer = data.customer || {};
    const transparent = data.transparent || {};
    const checkout = data.checkout || {};
    const billing = data.billing || {};
    const payerInfo = data.payerInformation || {};

    const orderId =
      transparent.id ||
      checkout.id ||
      billing.id ||
      data.id ||
      eventId ||
      `order_${Date.now()}`;

    const customerName =
      customer.name ||
      payerInfo.PIX?.name ||
      payerInfo.BOLETO?.name ||
      billing.customer?.metadata?.name ||
      billing.customer?.name ||
      data.name ||
      data.customerName ||
      'Empreendedor(a)';

    const customerEmail =
      customer.email?.trim() ||
      payerInfo.email?.trim() ||
      billing.customer?.metadata?.email?.trim() ||
      billing.customer?.email?.trim() ||
      data.email?.trim() ||
      data.customerEmail?.trim();

    const amountInCents =
      transparent.amount ||
      checkout.amount ||
      billing.amount ||
      data.amount ||
      1990;

    const paymentMethod =
      payerInfo.method ||
      (transparent.methods && transparent.methods[0]) ||
      billing.methods?.[0] ||
      'PIX';

    if (!customerEmail) {
      console.warn('[Webhook] E-mail do cliente não localizado no payload recebido. Payload Data:', JSON.stringify(data));
      return {
        statusCode: 200,
        data: {
          ok: true,
          warning: 'E-mail do comprador não foi encontrado no evento recebido.',
        },
      };
    }

    // 6. Controle de Idempotência (Evita disparos duplicados)
    const uniqueKey = `${orderId}_${customerEmail}`;
    if (idempotency.has(uniqueKey) || idempotency.has(eventId)) {
      console.log(`[Webhook] Evento/Cobrança já processado anteriormente (${uniqueKey}). Respondendo 200 OK.`);
      return {
        statusCode: 200,
        data: {
          ok: true,
          idempotent: true,
          message: 'Evento já processado anteriormente.',
        },
      };
    }

    // 7. Envio do E-mail com os Materiais do Kit 365 Versículos
    console.log(`[Webhook] Disparando e-mail de entrega para ${customerName} <${customerEmail}>...`);

    const emailResult = await emailService.sendDeliveryEmail({
      customerName,
      customerEmail,
      orderId,
      amountInCents,
      paymentMethod,
    });

    // Registra como processado
    idempotency.markAsProcessed(uniqueKey, customerEmail);
    if (eventId) idempotency.markAsProcessed(eventId, customerEmail);

    console.log(`[Webhook] Processamento concluído com sucesso para ${customerEmail}!`);
    console.log(`============================================================\n`);

    return {
      statusCode: 200,
      data: {
        success: true,
        message: 'Pagamento confirmado e e-mail de entrega enviado com sucesso.',
        orderId,
        customerEmail,
        delivery: emailResult,
      },
    };
  } catch (error: any) {
    console.error('[Webhook] Exceção crítica ao processar webhook:', error);
    return {
      statusCode: 500,
      data: {
        error: 'Internal Server Error',
        message: error?.message || 'Falha inesperada ao processar o webhook.',
      },
    };
  }
}
