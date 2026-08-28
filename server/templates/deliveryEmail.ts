import { config } from '../config';

export interface EmailTemplateData {
  customerName: string;
  customerEmail: string;
  orderId?: string;
  amountInCents?: number;
  paymentMethod?: string;
}

/**
 * Gera o template de e-mail HTML e Plain Text para entrega do Kit 365 Versículos.
 */
export function generateDeliveryEmail(data: EmailTemplateData): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = data.customerName.trim().split(' ')[0] || 'Empreendedor(a)';
  const subject = `🎉 Seu Kit 365 Versículos + Bônus Canva Chegou! [Acesso Imediato]`;

  const pdfUrl = config.materials.kitPdfUrl;
  const canvaUrl = config.materials.canvaBonusUrl;
  const videoUrl = config.materials.videoClassUrl;
  const whatsappUrl = config.materials.supportWhatsapp;

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F2EBE3;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #4B3621;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    .wrapper {
      width: 100%;
      background-color: #F2EBE3;
      padding: 30px 15px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FAF6F0;
      border: 1px solid #E8DFD5;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(75, 54, 33, 0.06);
    }
    .header {
      background-color: #4B3621;
      padding: 32px 24px;
      text-align: center;
      color: #FAF6F0;
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      background-color: #E1AD01;
      color: #2B1D12;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 50px;
      margin-bottom: 12px;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 800;
      color: #FAF6F0;
      line-height: 1.2;
    }
    .content {
      padding: 32px 24px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 700;
      color: #2B1D12;
      margin-bottom: 12px;
    }
    .intro {
      font-size: 14px;
      color: #5A422D;
      margin-bottom: 24px;
    }
    .item-card {
      background-color: #FFFFFF;
      border: 1px solid #E8DFD5;
      border-radius: 14px;
      padding: 18px 20px;
      margin-bottom: 16px;
    }
    .item-title {
      font-size: 15px;
      font-weight: 800;
      color: #2B1D12;
      margin: 0 0 6px 0;
      display: flex;
      align-items: center;
    }
    .item-desc {
      font-size: 12px;
      color: #6B533E;
      margin: 0 0 14px 0;
    }
    .btn-gold {
      display: block;
      background-color: #E1AD01;
      color: #2B1D12 !important;
      font-size: 13px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
      padding: 12px 18px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(225, 173, 1, 0.3);
    }
    .btn-dark {
      display: block;
      background-color: #2B1D12;
      color: #FFFFFF !important;
      font-size: 13px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
      padding: 12px 18px;
      border-radius: 10px;
    }
    .btn-red {
      display: block;
      background-color: #D32F2F;
      color: #FFFFFF !important;
      font-size: 13px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
      padding: 12px 18px;
      border-radius: 10px;
    }
    .guide-box {
      background-color: #F2EBE3;
      border-radius: 14px;
      padding: 20px;
      margin: 28px 0;
      border-left: 4px solid #E1AD01;
    }
    .guide-box h4 {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #2B1D12;
      font-weight: 800;
    }
    .guide-step {
      font-size: 12px;
      color: #5A422D;
      margin-bottom: 6px;
    }
    .footer {
      background-color: #FAF6F0;
      border-top: 1px solid #E8DFD5;
      padding: 24px;
      text-align: center;
      font-size: 11px;
      color: #8C7561;
    }
    .footer a {
      color: #4B3621;
      font-weight: bold;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- Cabeçalho -->
      <div class="header">
        <div class="badge">Acesso Imediato Liberado</div>
        <h1>Kit 365 Versículos para Delivery</h1>
      </div>

      <!-- Conteúdo Principal -->
      <div class="content">
        <div class="greeting">Olá, ${firstName}! Que alegria ter você aqui.</div>
        <p class="intro">
          Seu pagamento foi confirmado com sucesso e agora você tem acesso vitalício a todos os materiais para transformar suas embalagens de delivery em canais de bênção, afeto e fidelização.
        </p>

        <!-- Material 1: PDF Principal -->
        <div class="item-card">
          <h3 class="item-title">📖 Kit 365 Versículos (PDF de Alta Resolução)</h3>
          <p class="item-desc">
            Arquivo digital vetorial em 300 DPI, formatado em folha A4 com linhas de corte econômicas, pronto para imprimir e recortar.
          </p>
          <a href="${pdfUrl}" target="_blank" class="btn-gold">
            ⬇️ BAIXAR PDF DOS 365 VERSÍCULOS
          </a>
        </div>

        <!-- Material 2: Bônus Canva -->
        <div class="item-card">
          <h3 class="item-title">🎁 Super Bônus: Cartão de Agradecimento Editável</h3>
          <p class="item-desc">
            Template oficial no Canva (100% editável no plano Gratuito ou Pro). Adicione sua marca, seu WhatsApp e suas redes sociais em 2 minutos.
          </p>
          <a href="${canvaUrl}" target="_blank" class="btn-dark">
            🎨 ABRIR TEMPLATE NO CANVA
          </a>
        </div>

        <!-- Material 3: Vídeo Aula -->
        <div class="item-card">
          <h3 class="item-title">🎥 Vídeo Aula: Como Editar e Imprimir</h3>
          <p class="item-desc">
            Passo a passo rápido mostrando a bancada, o corte e a montagem na prática para otimizar o tempo na sua cozinha.
          </p>
          <a href="${videoUrl}" target="_blank" class="btn-red">
            ▶️ ASSISTIR VÍDEO AULA
          </a>
        </div>

        <!-- Passo a Passo Rápido -->
        <div class="guide-box">
          <h4>💡 Como aplicar no seu delivery hoje mesmo:</h4>
          <div class="guide-step"><strong>1. Imprima:</strong> Baixe o PDF e imprima em qualquer impressora (folha A4 comum ou offset 90g/120g).</div>
          <div class="guide-step"><strong>2. Recorte:</strong> Use tesoura ou estilete seguindo as linhas pontilhadas guias.</div>
          <div class="guide-step"><strong>3. Grampeie ou Cole:</strong> Fixe na sacola kraft, caixa de pizza ou marmita junto com a comanda do cliente.</div>
        </div>

        <p style="font-size: 13px; color: #5A422D; text-align: center; margin-top: 24px;">
          Dúvidas ou precisa de suporte? Fale com nossa equipe no WhatsApp:
          <br>
          <a href="${whatsappUrl}" target="_blank" style="color: #2E7D32; font-weight: bold; text-decoration: underline; font-size: 14px; display: inline-block; margin-top: 6px;">
            💬 Chamar no WhatsApp de Suporte
          </a>
        </p>
      </div>

      <!-- Rodapé -->
      <div class="footer">
        <p style="margin: 0 0 6px 0;"><strong>Kit 365 Versículos para Embalagens de Delivery</strong></p>
        <p style="margin: 0;">Você recebeu este e-mail porque concluiu a compra do kit. Guarde este e-mail para acessar seus materiais quando quiser.</p>
      </div>

    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
Olá, ${firstName}!

Parabéns! Seu pagamento foi confirmado com sucesso e seus materiais do Kit 365 Versículos para Delivery estão liberados com acesso vitalício!

Aqui estão os seus links de acesso direto:

1. 📖 Kit 365 Versículos (PDF Alta Resolução):
${pdfUrl}

2. 🎁 Super Bônus - Template Cartão de Agradecimento (Canva Editável):
${canvaUrl}

3. 🎥 Vídeo Aula Prática - Como Editar e Imprimir:
${videoUrl}

COMO USAR NO SEU DELIVERY:
1. Imprima o PDF em folha A4 comum ou kraft.
2. Corte nas linhas pontilhadas demarcadas.
3. Grampeie ou cole nas suas sacolas de entrega!

Precisa de ajuda ou tem alguma dúvida? Fale com a gente no WhatsApp:
${whatsappUrl}

Boas vendas e que Deus abençoe ricamente o seu negócio!
Equipe Kit 365 Versículos
  `.trim();

  return { subject, html, text };
}
