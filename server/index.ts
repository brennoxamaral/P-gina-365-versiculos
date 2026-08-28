import express from 'express';
import { config } from './config';
import { webhookRouter } from './routes/webhook';

const app = express();

// Middleware para capturar o rawBody necessário para validação da assinatura HMAC
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf.toString('utf8');
    },
  })
);

// Rota de Healthcheck
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Batata Mania - Kit 365 Versículos Webhook Service',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

// Rotas de Webhook
app.use('/api/webhook', webhookRouter);

// Inicialização do servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`\n============================================================`);
  console.log(`🚀 Servidor de Webhooks AbacatePay rodando na porta ${PORT}`);
  console.log(`📡 URL do Webhook Local: http://localhost:${PORT}/api/webhook/abacatepay?webhookSecret=${config.abacate.webhookSecret}`);
  console.log(`💚 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`============================================================\n`);
});

export default app;
