/**
 * API Root Serverless Endpoint para Vercel
 * GET /api
 */
export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  return res.status(200).json({
    status: 'online',
    name: 'Batata Mania - API Kit 365 Versículos',
    endpoints: {
      health: '/api/health',
      webhook: '/api/webhook/abacatepay',
    },
    timestamp: new Date().toISOString(),
  });
}
