import { processAbacateWebhook } from '../server/services/processWebhook';

/**
 * Webhook Serverless Handler para Vercel
 * Rota: /api/webhook (e sub-rotas)
 */
export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const result = await processAbacateWebhook(
      req.method,
      req.query || {},
      req.headers || {},
      req.body || {}
    );

    return res.status(result.statusCode).json(result.data);
  } catch (error: any) {
    console.error('[Handler] Erro não tratado na rota /api/webhook:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message || 'Erro inesperado no servidor.',
    });
  }
}
