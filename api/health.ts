/**
 * Healthcheck Endpoint Serverless para Vercel
 * GET /api/health
 */
export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  return res.status(200).json({
    status: 'ok',
    service: 'Batata Mania - Kit 365 Versículos Webhook Service',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'production',
  });
}
