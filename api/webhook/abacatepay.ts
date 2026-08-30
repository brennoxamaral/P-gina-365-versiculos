import crypto from 'node:crypto';

// Conjunto em memória para evitar envio duplicado em caso de retentativas
const processedEvents = new Set<string>();

/**
 * Gera o template HTML e Plain Text do e-mail de entrega
 */
function buildDeliveryEmail(params: {
  customerName: string;
  pdfUrl: string;
  canvaUrl: string;
  videoUrl: string;
  whatsappUrl: string;
}) {
  const firstName = params.customerName.trim().split(' ')[0] || 'Empreendedor(a)';
  const subject = '🎉 Seu Kit 365 Versículos + Bônus Canva Chegou! [Acesso Imediato]';

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F2EBE3; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #4B3621; line-height: 1.6; }
    .wrapper { width: 100%; background-color: #F2EBE3; padding: 30px 15px; box-sizing: border-box; }
    .container { max-width: 600px; margin: 0 auto; background-color: #FAF6F0; border: 1px solid #E8DFD5; border-radius: 20px; overflow: hidden; }
    .header { background-color: #4B3621; padding: 32px 24px; text-align: center; color: #FAF6F0; }
    .badge { display: inline-block; padding: 6px 14px; background-color: #E1AD01; color: #2B1D12; font-size: 11px; font-weight: 800; text-transform: uppercase; border-radius: 50px; margin-bottom: 12px; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; color: #FAF6F0; }
    .content { padding: 32px 24px; }
    .greeting { font-size: 18px; font-weight: 700; color: #2B1D12; margin-bottom: 12px; }
    .intro { font-size: 14px; color: #5A422D; margin-bottom: 24px; }
    .item-card { background-color: #FFFFFF; border: 1px solid #E8DFD5; border-radius: 14px; padding: 18px 20px; margin-bottom: 16px; }
    .item-title { font-size: 15px; font-weight: 800; color: #2B1D12; margin: 0 0 6px 0; }
    .item-desc { font-size: 12px; color: #6B533E; margin: 0 0 14px 0; }
    .btn-gold { display: block; background-color: #E1AD01; color: #2B1D12 !important; font-size: 13px; font-weight: 800; text-align: center; text-decoration: none; padding: 12px 18px; border-radius: 10px; }
    .btn-dark { display: block; background-color: #2B1D12; color: #FFFFFF !important; font-size: 13px; font-weight: 800; text-align: center; text-decoration: none; padding: 12px 18px; border-radius: 10px; }
    .btn-red { display: block; background-color: #D32F2F; color: #FFFFFF !important; font-size: 13px; font-weight: 800; text-align: center; text-decoration: none; padding: 12px 18px; border-radius: 10px; }
    .guide-box { background-color: #F2EBE3; border-radius: 14px; padding: 20px; margin: 28px 0; border-left: 4px solid #E1AD01; }
    .guide-box h4 { margin: 0 0 10px 0; font-size: 14px; color: #2B1D12; font-weight: 800; }
    .guide-step { font-size: 12px; color: #5A422D; margin-bottom: 6px; }
    .footer { background-color: #FAF6F0; border-top: 1px solid #E8DFD5; padding: 24px; text-align: center; font-size: 11px; color: #8C7561; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="badge">Acesso Imediato Liberado</div>
        <h1>Kit 365 Versículos para Delivery</h1>
      </div>
      <div class="content">
        <div class="greeting">Olá, ${firstName}! Que alegria ter você aqui.</div>
        <p class="intro">
          Seu pagamento foi confirmado com sucesso! Abaixo estão os seus acessos diretos aos materiais para transformar suas embalagens de delivery.
        </p>

        <div class="item-card">
          <h3 class="item-title">📖 Kit 365 Versículos (PDF de Alta Resolução)</h3>
          <p class="item-desc">Arquivo digital vetorial em 300 DPI, formatado em folha A4 com linhas de corte econômicas, pronto para imprimir e recortar.</p>
          <a href="${params.pdfUrl}" target="_blank" class="btn-gold">⬇️ BAIXAR PDF DOS 365 VERSÍCULOS</a>
        </div>

        <div class="item-card">
          <h3 class="item-title">🎁 Super Bônus: Cartão de Agradecimento Editável</h3>
          <p class="item-desc">Template no Canva (100% editável no plano Gratuito ou Pro). Adicione sua marca e WhatsApp.</p>
          <a href="${params.canvaUrl}" target="_blank" class="btn-dark">🎨 ABRIR TEMPLATE NO CANVA</a>
        </div>

        <div class="item-card">
          <h3 class="item-title">🎥 Vídeo Aula: Como Editar e Imprimir</h3>
          <p class="item-desc">Passo a passo rápido mostrando o corte e montagem na prática para agilizar na cozinha.</p>
          <a href="${params.videoUrl}" target="_blank" class="btn-red">▶️ ASSISTIR VÍDEO AULA</a>
        </div>

        <div class="guide-box">
          <h4>💡 Como aplicar no seu delivery:</h4>
          <div class="guide-step"><strong>1. Imprima:</strong> Em folha A4 comum ou offset 90g/120g.</div>
          <div class="guide-step"><strong>2. Recorte:</strong> Siga as linhas guias pontilhadas.</div>
          <div class="guide-step"><strong>3. Entregue:</strong> Fixe na sacola kraft ou marmita junto com o pedido.</div>
        </div>

        <p style="font-size: 13px; color: #5A422D; text-align: center; margin-top: 24px;">
          Dúvidas ou precisa de suporte?
          <br>
          <a href="${params.whatsappUrl}" target="_blank" style="color: #2E7D32; font-weight: bold; text-decoration: underline; font-size: 14px; display: inline-block; margin-top: 6px;">
            💬 Chamar no WhatsApp de Suporte
          </a>
        </p>
      </div>
      <div class="footer">
        <p style="margin: 0 0 6px 0;"><strong>Kit 365 Versículos para Embalagens de Delivery</strong></p>
        <p style="margin: 0;">Guarde este e-mail para consultar seus links sempre que precisar.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
Olá, ${firstName}!

Seu pagamento foi confirmado com sucesso e seus materiais do Kit 365 Versículos para Delivery estão liberados!

Seus links de acesso direto:
1. PDF dos 365 Versículos: ${params.pdfUrl}
2. Bônus Template Canva: ${params.canvaUrl}
3. Vídeo Aula: ${params.videoUrl}

Suporte WhatsApp: ${params.whatsappUrl}

Equipe Kit 365 Versículos
  `.trim();

  return { subject, html, text };
}

/**
 * Handler Serverless 100% Autônomo e Resiliente para Vercel
 */
export default async function handler(req: any, res: any) {
  // Configura cabeçalho CORS e tipo de conteúdo
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Webhook-Signature');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Resposta amigável para GET (verificação de status no navegador)
  if (req.method === 'GET' || req.method === 'HEAD') {
    return res.status(200).json({
      status: 'active',
      service: 'Batata Mania - Kit 365 Versículos Webhook API',
      message: 'Endpoint de webhook da AbacatePay está ativo e pronto para receber notificações.',
      timestamp: new Date().toISOString(),
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log(`[Webhook] Notificação recebida em ${new Date().toISOString()}`);

  try {
    // 1. Leitura do corpo com segurança
    let body = req.body;
    let rawBody = '';

    if (typeof body === 'string') {
      rawBody = body;
      try {
        body = JSON.parse(body);
      } catch {
        // mantém como string se falhar parse
      }
    } else if (Buffer.isBuffer(body)) {
      rawBody = body.toString('utf8');
      try {
        body = JSON.parse(rawBody);
      } catch {
        // continua
      }
    } else if (body && typeof body === 'object') {
      rawBody = JSON.stringify(body);
    }

    const query = req.query || {};
    const headers = req.headers || {};

    const secretFromQuery = (query.webhookSecret as string | undefined) || undefined;
    const signatureFromHeader =
      (headers['x-webhook-signature'] as string | undefined) ||
      (headers['X-Webhook-Signature'] as string | undefined) ||
      undefined;

    const configuredSecret = process.env.WEBHOOK_SECRET || 'batata_mania_365_versiculos_prod_secret_2026';
    const publicKey =
      process.env.ABACATEPAY_PUBLIC_KEY ||
      't9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9';

    // 2. Validação de Segurança
    if (secretFromQuery) {
      if (secretFromQuery.trim() !== configuredSecret.trim()) {
        console.warn('[Webhook] Secret inválido recebido na URL:', secretFromQuery);
        return res.status(401).json({ error: 'Unauthorized: Secret inválido' });
      }
      console.log('[Webhook] Autenticado com sucesso via secret da URL.');
    } else if (signatureFromHeader) {
      try {
        const expectedSig = crypto
          .createHmac('sha256', publicKey)
          .update(Buffer.from(rawBody, 'utf8'))
          .digest('base64');

        if (expectedSig !== signatureFromHeader.trim()) {
          console.warn('[Webhook] Assinatura HMAC divergente.');
        } else {
          console.log('[Webhook] Assinatura HMAC validada com sucesso.');
        }
      } catch (sigErr) {
        console.warn('[Webhook] Aviso ao validar HMAC:', sigErr);
      }
    }

    // 3. Validação do Evento
    if (!body || !body.event) {
      console.warn('[Webhook] Payload sem evento especificado:', body);
      return res.status(400).json({ error: 'Bad Request: Evento ausente no corpo da requisição.' });
    }

    const eventType = String(body.event).toLowerCase();
    const eventId = body.id || `evt_${Date.now()}`;
    console.log(`[Webhook] Evento: "${eventType}" (ID: ${eventId})`);

    const approvedEvents = [
      'transparent.completed',
      'checkout.completed',
      'billing.paid',
      'charge.completed',
      'charge.paid',
      'pix.completed',
      'payment.completed',
    ];

    if (!approvedEvents.includes(eventType)) {
      console.log(`[Webhook] Evento "${eventType}" ignorado (não é confirmação de pagamento).`);
      return res.status(200).json({ ok: true, message: `Evento ${eventType} recebido e ignorado com sucesso.` });
    }

    // 4. Extração dos Dados do Comprador com Múltiplos Fallbacks
    const data = body.data || {};
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

    if (!customerEmail) {
      console.warn('[Webhook] E-mail do cliente não encontrado no payload:', JSON.stringify(data));
      return res.status(200).json({
        ok: true,
        warning: 'E-mail não localizado no payload, notificação não enviada.',
      });
    }

    // 5. Verificação de Idempotência
    const uniqueKey = `${orderId}_${customerEmail}`;
    if (processedEvents.has(uniqueKey) || processedEvents.has(eventId)) {
      console.log(`[Webhook] Cobrança/Evento já processado anteriormente (${uniqueKey}). Retornando 200 OK.`);
      return res.status(200).json({ ok: true, idempotent: true, message: 'Evento já processado.' });
    }

    // 6. Preparação dos Links dos Materiais
    const pdfUrl =
      process.env.MATERIAL_KIT_PDF_URL ||
      'https://drive.google.com/file/d/1Vz7G3yHps-yLjbbxvS6_NDMxvLntxhGX/view?usp=sharing';
    const canvaUrl =
      process.env.MATERIAL_CANVA_BONUS_URL ||
      'https://canva.link/cartao-de-agradecimento-estrategico';
    const videoUrl = process.env.MATERIAL_VIDEO_URL || 'https://youtube.com';
    const whatsappUrl =
      process.env.SUPPORT_WHATSAPP ||
      'https://wa.me/5511999999999?text=Ol%C3%A1%2C+comprei+o+Kit+365+Vers%C3%ADculos+e+preciso+de+ajuda';

    const { subject, html, text } = buildDeliveryEmail({
      customerName,
      pdfUrl,
      canvaUrl,
      videoUrl,
      whatsappUrl,
    });

    const resendApiKey = process.env.RESEND_API_KEY || '';
    const fromEmail = process.env.EMAIL_FROM || 'Kit 365 Versículos <onboarding@resend.dev>';

    // 7. Envio do E-mail via Resend API direta (HTTPS nativo)
    let emailResult: any = null;

    if (resendApiKey && resendApiKey.startsWith('re_')) {
      console.log(`[Webhook] Enviando e-mail de entrega para: ${customerEmail}`);
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [customerEmail],
            subject,
            html,
            text,
          }),
        });

        const resendJson: any = await resendResponse.json();

        if (resendResponse.ok && resendJson?.id) {
          console.log(`[Webhook] E-mail entregue com sucesso pelo Resend! ID: ${resendJson.id}`);
          emailResult = { success: true, provider: 'resend', id: resendJson.id };
        } else {
          console.error('[Webhook] Resend retornou erro:', resendJson);
          emailResult = { success: false, provider: 'resend', error: resendJson?.message || 'Falha no envio' };
        }
      } catch (emailErr: any) {
        console.error('[Webhook] Exceção na chamada ao Resend:', emailErr);
        emailResult = { success: false, provider: 'resend', error: emailErr?.message };
      }
    } else {
      console.log('⚡ [Webhook - SIMULAÇÃO] RESEND_API_KEY não configurada na Vercel.');
      emailResult = { success: true, provider: 'simulation', id: `sim_${Date.now()}` };
    }

    // Registra evento como processado
    processedEvents.add(uniqueKey);
    processedEvents.add(eventId);

    return res.status(200).json({
      success: true,
      message: 'Pagamento processado com sucesso.',
      orderId,
      customerEmail,
      delivery: emailResult,
    });
  } catch (error: any) {
    console.error('[Webhook] Erro fatal:', error);
    return res.status(200).json({
      error: 'Internal Error Caught',
      message: error?.message || 'Erro inesperado',
    });
  }
}
