import dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

export const config = {
  // Porta do servidor Express
  port: parseInt(process.env.PORT || '3001', 10),

  // URL base da aplicação
  appUrl: process.env.APP_URL || 'http://localhost:3000',

  // AbacatePay
  abacate: {
    apiKey: process.env.ABACATEPAY_API_KEY || process.env.VITE_ABACATEPAY_API_KEY || '',
    baseUrl: 'https://api.abacatepay.com/v2',
    // Chave pública oficial fornecida na documentação para verificação HMAC-SHA256
    publicKey:
      process.env.ABACATEPAY_PUBLIC_KEY ||
      't9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9',
    webhookSecret: process.env.WEBHOOK_SECRET || 'batata_mania_365_secret_2026',
  },

  // E-mail (Resend & SMTP)
  email: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    from: process.env.EMAIL_FROM || 'Kit 365 Versículos <onboarding@resend.dev>',
    // Configurações de SMTP opcionais (como fallback)
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },

  // Links dos Materiais Entregues
  materials: {
    kitPdfUrl:
      process.env.MATERIAL_KIT_PDF_URL ||
      'https://drive.google.com/file/d/1Vz7G3yHps-yLjbbxvS6_NDMxvLntxhGX/view?usp=sharing',
    canvaBonusUrl:
      process.env.MATERIAL_CANVA_BONUS_URL ||
      'https://canva.link/cartao-de-agradecimento-estrategico',
    videoClassUrl:
      process.env.MATERIAL_VIDEO_URL ||
      'https://youtube.com',
    supportWhatsapp:
      process.env.SUPPORT_WHATSAPP ||
      'https://wa.me/5511999999999?text=Ol%C3%A1%2C+comprei+o+Kit+365+Vers%C3%ADculos+e+preciso+de+ajuda',
  },
};
