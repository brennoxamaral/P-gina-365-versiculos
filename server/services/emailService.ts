import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { config } from '../config';
import { generateDeliveryEmail, EmailTemplateData } from '../templates/deliveryEmail';

export interface SendEmailResult {
  success: boolean;
  provider: 'resend' | 'smtp' | 'dev-simulation';
  id?: string;
  error?: string;
}

export class EmailService {
  private resendClient: Resend | null = null;
  private smtpTransporter: nodemailer.Transporter | null = null;

  constructor() {
    // Inicializa Resend se API Key estiver configurada
    if (config.email.resendApiKey && config.email.resendApiKey.startsWith('re_')) {
      try {
        this.resendClient = new Resend(config.email.resendApiKey);
        console.log('[EmailService] Provedor Resend inicializado com sucesso.');
      } catch (err) {
        console.error('[EmailService] Erro ao inicializar Resend:', err);
      }
    }

    // Inicializa SMTP se host estiver configurado
    if (!this.resendClient && config.email.smtp.host && config.email.smtp.user) {
      try {
        this.smtpTransporter = nodemailer.createTransport({
          host: config.email.smtp.host,
          port: config.email.smtp.port,
          secure: config.email.smtp.secure,
          auth: {
            user: config.email.smtp.user,
            pass: config.email.smtp.pass,
          },
        });
        console.log('[EmailService] Provedor SMTP/Nodemailer inicializado com sucesso.');
      } catch (err) {
        console.error('[EmailService] Erro ao inicializar SMTP:', err);
      }
    }
  }

  /**
   * Dispara o e-mail de entrega do Kit 365 Versículos para o comprador
   */
  public async sendDeliveryEmail(data: EmailTemplateData): Promise<SendEmailResult> {
    const { customerEmail, customerName } = data;
    const { subject, html, text } = generateDeliveryEmail(data);

    // 1. Envio via RESEND (Provedor Principal)
    if (this.resendClient || (config.email.resendApiKey && config.email.resendApiKey.startsWith('re_'))) {
      const client = this.resendClient || new Resend(config.email.resendApiKey);
      try {
        console.log(`[EmailService] Enviando e-mail via Resend para: ${customerEmail}`);
        const response = await client.emails.send({
          from: config.email.from,
          to: [customerEmail],
          subject,
          html,
          text,
        });

        if (response.error) {
          console.error('[EmailService] Resend retornou erro:', response.error);
          return {
            success: false,
            provider: 'resend',
            error: response.error.message || 'Falha no envio com Resend',
          };
        }

        console.log(`[EmailService] E-mail entregue com sucesso via Resend! ID: ${response.data?.id}`);
        return {
          success: true,
          provider: 'resend',
          id: response.data?.id,
        };
      } catch (err: any) {
        console.error('[EmailService] Exceção ao enviar via Resend:', err);
        return {
          success: false,
          provider: 'resend',
          error: err.message || 'Erro inesperado no Resend',
        };
      }
    }

    // 2. Envio via SMTP / Nodemailer (Fallback)
    if (this.smtpTransporter) {
      try {
        console.log(`[EmailService] Enviando e-mail via SMTP para: ${customerEmail}`);
        const info = await this.smtpTransporter.sendMail({
          from: config.email.from,
          to: customerEmail,
          subject,
          html,
          text,
        });

        console.log(`[EmailService] E-mail entregue com sucesso via SMTP! ID: ${info.messageId}`);
        return {
          success: true,
          provider: 'smtp',
          id: info.messageId,
        };
      } catch (err: any) {
        console.error('[EmailService] Erro ao enviar via SMTP:', err);
        return {
          success: false,
          provider: 'smtp',
          error: err.message || 'Erro ao enviar via SMTP',
        };
      }
    }

    // 3. Modo Simulação / DEV (quando nenhuma credencial foi informada ainda)
    console.log('\n============================================================');
    console.log('⚡ [EmailService - MODO SIMULAÇÃO LOCAL / DEV]');
    console.log(`Para: ${customerName} <${customerEmail}>`);
    console.log(`Assunto: ${subject}`);
    console.log(`Links no E-mail:`);
    console.log(` - PDF Drive: ${config.materials.kitPdfUrl}`);
    console.log(` - Canva Bonus: ${config.materials.canvaBonusUrl}`);
    console.log(` - Vídeo Aula: ${config.materials.videoClassUrl}`);
    console.log('💡 DICA: Para enviar e-mails reais, configure RESEND_API_KEY no seu arquivo .env');
    console.log('============================================================\n');

    return {
      success: true,
      provider: 'dev-simulation',
      id: `mock_email_${Date.now()}`,
    };
  }
}

export const emailService = new EmailService();
