import healthHandler from '../api/health';
import webhookHandler from '../api/webhook/abacatepay';
import indexHandler from '../api/index';

async function runTests() {
  console.log('--- TEST 1: Healthcheck Handler ---');
  let lastStatus = 0;
  let lastData: any = null;
  const resMock = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    setHeader(k: string, v: string) { this.headers[k] = v; },
    status(code: number) { lastStatus = code; return this; },
    json(data: any) { lastData = data; return this; }
  };

  await healthHandler({ method: 'GET' }, resMock);
  console.log(`[Health] Status: ${lastStatus}, Output:`, lastData);

  console.log('\n--- TEST 2: Webhook GET Check ---');
  await webhookHandler({ method: 'GET' }, resMock);
  console.log(`[Webhook GET] Status: ${lastStatus}, Output:`, lastData);

  console.log('\n--- TEST 3: Webhook POST Unauthorized Secret Check ---');
  await webhookHandler({ method: 'POST', query: { webhookSecret: 'wrong_secret' }, body: {} }, resMock);
  console.log(`[Webhook Unauthorized] Status: ${lastStatus}, Output:`, lastData);

  console.log('\n--- TEST 4: Index Root Handler ---');
  await indexHandler({ method: 'GET' }, resMock);
  console.log(`[API Index] Status: ${lastStatus}, Output:`, lastData);

  console.log('\n✅ Todos os handlers serverless foram testados e executados com sucesso!');
}

runTests().catch(err => {
  console.error('❌ Erro no teste:', err);
  process.exit(1);
});
