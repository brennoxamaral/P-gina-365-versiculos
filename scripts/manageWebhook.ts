import crypto from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.ABACATEPAY_API_KEY || '';
const BASE_URL = 'https://api.abacatepay.com/v2';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'batata_mania_365_secret_2026';
const PUBLIC_KEY =
  process.env.ABACATEPAY_PUBLIC_KEY ||
  't9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9';

/**
 * Cria um webhook na AbacatePay
 */
async function createWebhook(customUrl?: string) {
  const appUrl = customUrl || process.env.APP_URL || 'https://seu-dominio.com';
  const endpoint = `${appUrl}/api/webhook/abacatepay`;

  console.log(`[AbacatePay] Criando webhook para o endpoint: ${endpoint}`);

  const payload = {
    name: 'Envio Kit 365 Versículos',
    endpoint: endpoint,
    secret: WEBHOOK_SECRET,
    events: ['transparent.completed', 'checkout.completed'],
  };

  try {
    const response = await fetch(`${BASE_URL}/webhooks/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok || result.error) {
      console.error('❌ Falha ao criar webhook:', result);
      return;
    }

    console.log('✅ Webhook criado com sucesso na AbacatePay!');
    console.log(JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
  }
}

/**
 * Lista todos os webhooks cadastrados na AbacatePay
 */
async function listWebhooks() {
  console.log(`[AbacatePay] Buscando webhooks cadastrados...`);

  try {
    const response = await fetch(`${BASE_URL}/webhooks/list`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (!response.ok || result.error) {
      console.error('❌ Falha ao listar webhooks:', result);
      return;
    }

    console.log('✅ Webhooks encontrados na sua conta:');
    console.log(JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
  }
}

/**
 * Simula localmente um evento de webhook com assinatura HMAC válida
 */
async function testLocalWebhook(targetEmail?: string) {
  const port = process.env.PORT || '3001';
  const testUrl = `http://127.0.0.1:${port}/api/webhook/abacatepay?webhookSecret=${encodeURIComponent(WEBHOOK_SECRET)}`;
  const email = targetEmail || 'comprador.teste@gmail.com';

  console.log(`[Test] Enviando simulação de pagamento aprovado para: ${testUrl}`);
  console.log(`[Test] E-mail de destino do comprador: ${email}`);

  const payload = {
    event: 'transparent.completed',
    apiVersion: 2,
    devMode: true,
    id: `test_evt_${Date.now()}`,
    data: {
      transparent: {
        id: `char_test_${Date.now()}`,
        amount: 1990,
        paidAmount: 1990,
        status: 'PAID',
        frequency: 'ONE_TIME',
        devMode: true,
        methods: ['PIX'],
        createdAt: new Date().toISOString(),
      },
      customer: {
        id: 'cust_test_123',
        name: 'Maria Santos Empreendedora',
        email: email,
        taxId: '123.456.789-00',
      },
      payerInformation: {
        method: 'PIX',
        PIX: {
          name: 'Maria Santos Empreendedora',
          taxId: '123.456.789-00',
          isSameAsCustomer: true,
        },
      },
    },
  };

  const rawBody = JSON.stringify(payload);

  // Calcula assinatura HMAC com a chave pública
  const signature = crypto
    .createHmac('sha256', PUBLIC_KEY)
    .update(Buffer.from(rawBody, 'utf8'))
    .digest('base64');

  try {
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
      },
      body: rawBody,
    });

    const result = await response.json();
    console.log(`\n[Test] Resposta HTTP Status: ${response.status}`);
    console.log('[Test] Corpo da Resposta:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('\n🎉 Teste executado com sucesso!');
    } else {
      console.log('\n⚠️ Webhook retornou erro.');
    }
  } catch (error: any) {
    console.error('❌ Falha ao conectar ao servidor local. Certifique-se de que o servidor está rodando (npm run server):', error.message);
  }
}

// Execução a partir dos argumentos da linha de comando
const action = process.argv[2] || 'list';
const extraArg = process.argv[3];

switch (action) {
  case 'create':
    createWebhook(extraArg);
    break;
  case 'list':
    listWebhooks();
    break;
  case 'test':
    testLocalWebhook(extraArg);
    break;
  default:
    console.log(`
Uso:
  npm run webhook:list                - Lista todos os webhooks na AbacatePay
  npm run webhook:create [url]        - Cria webhook na AbacatePay com sua URL
  npm run webhook:test [email]        - Simula localmente um webhook e dispara o e-mail
    `);
}
