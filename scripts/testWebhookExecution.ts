import webhookHandler from '../api/webhook/abacatepay';
import { config } from '../server/config';

async function testFullWebhook() {
  console.log('--- TEST: Webhook Payment Completed Simulation ---');
  let lastStatus = 0;
  let lastData: any = null;
  const resMock = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    setHeader(k: string, v: string) { this.headers[k] = v; },
    status(code: number) { lastStatus = code; return this; },
    json(data: any) { lastData = data; return this; }
  };

  const payload = {
    event: 'transparent.completed',
    apiVersion: 2,
    devMode: true,
    id: `sim_evt_${Date.now()}`,
    data: {
      transparent: {
        id: `sim_charge_${Date.now()}`,
        amount: 1990,
        paidAmount: 1990,
        status: 'PAID',
        frequency: 'ONE_TIME',
        devMode: true,
        methods: ['PIX'],
        createdAt: new Date().toISOString(),
      },
      customer: {
        id: 'cust_sim_123',
        name: 'Cliente Teste Vercel',
        email: 'cliente.teste@exemplo.com',
        taxId: '123.456.789-00',
      },
      payerInformation: {
        method: 'PIX',
        PIX: {
          name: 'Cliente Teste Vercel',
          taxId: '123.456.789-00',
          isSameAsCustomer: true,
        },
      },
    },
  };

  const reqMock = {
    method: 'POST',
    query: {
      webhookSecret: config.abacate.webhookSecret,
    },
    body: payload,
    headers: {},
  };

  await webhookHandler(reqMock, resMock);
  console.log(`[Webhook Execution] Status: ${lastStatus}, Response:`, JSON.stringify(lastData, null, 2));

  if (lastStatus === 200 && lastData?.success) {
    console.log('\n🎉 Webhook processado com sucesso de ponta a ponta!');
  }
}

testFullWebhook().catch(err => {
  console.error('❌ Erro no teste de simulação:', err);
  process.exit(1);
});
