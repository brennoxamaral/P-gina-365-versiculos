import { Router, Request, Response } from 'express';
import { processAbacateWebhook } from '../services/processWebhook';

export const webhookRouter = Router();

interface CustomRequest extends Request {
  rawBody?: string | Buffer;
}

/**
 * Endpoints do Webhook para Express Local
 * GET /api/webhook/abacatepay (Status)
 * POST /api/webhook/abacatepay (Recebimento)
 * POST /api/webhook (Recebimento direto)
 */
const handleWebhookRequest = async (req: CustomRequest, res: Response) => {
  const result = await processAbacateWebhook(
    req.method,
    (req.query as Record<string, any>) || {},
    (req.headers as Record<string, any>) || {},
    req.rawBody || req.body
  );

  return res.status(result.statusCode).json(result.data);
};

webhookRouter.get('/', handleWebhookRequest);
webhookRouter.post('/', handleWebhookRequest);
webhookRouter.get('/abacatepay', handleWebhookRequest);
webhookRouter.post('/abacatepay', handleWebhookRequest);
