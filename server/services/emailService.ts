import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { config } from '../config';
import { generateDeliveryEmail, EmailTemplateData } from '../templates/deliveryEmail';

export interface SendEmailResult {
  success: boolean;
  provider: 'resend' | 'resend-fetch' | 'smtp' | 'dev-simulation';
  id?: string;
  error?: string;
}

export class EmailService {
  private resendClient: Resend | null = null;
  private smtpTransporter: nodemailer.Transporter | null = null;

  constructor() {
    const resendKey = process.env.RESEND_API_KEY || config.email.resendApiKey;
    if (resendKey && resendKey.startsWith('re_')) {
      try {
        this.resendClient = new Resend(resendKey);
        console.log('[EmailService] Provedor Resend inicializado com sucesso.');
      } catch (err) {
        console.error('[EmailService] Erro ao inicializar Resend:', err);
      }
    }

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
    const resendKey = process.env.RESEND_API_KEY || config.email.resendApiKey;
    const fromAddress = process.env.EMAIL_FROM || config.email.from;

    // 1. Envio via RESEND SDK ou Fetch Direto
    if (resendKey && resendKey.startsWith('re_')) {
      try {
        console.log(`[EmailService] Enviando e-mail via Resend para: ${customerEmail}`);
        
        // Tenta primeiro via fetch direto (100% à prova de falhas em ambientes serverless)
        const fetchRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [customerEmail],
            subject,
            html,
            text,
          }),
        });

        const resData: any = await fetchRes.json();

        if (fetchRes.ok && resData?.id) {
          console.log(`[EmailService] E-mail entregue com sucesso via Resend HTTP API! ID: ${resData.id}`);
          return {
            success: true,
            provider: 'resend-fetch',
            id: resData.id,
          };
        } else {
          console.warn('[EmailService] Resend HTTP retornou aviso/erro:', resData);
          // Tenta via SDK se o fetch retornar erro
          if (this.resendClient) {
            const sdkRes = await this.resendClient.emails.send({
              from: fromAddress,
              to: [customerEmail],
              subject,
              html,
              text,
            });
            if (sdkRes.data?.id) {
              return {
                success: true,
                provider: 'resend',
                id: sdkRes.data.id,
              };
            }
          }

          return {
            success: false,
            provider: 'resend',
            error: resData?.message || 'Falha ao enviar e-mail via Resend',
          };
        }
      } catch (err: any) {
        console.error('[EmailService] Exceção ao enviar via Resend:', err);
        return {
          success: false,
          provider: 'resend',
          error: err?.message || 'Erro inesperado no Resend',
        };
      }
    }

    // 2. Envio via SMTP / Nodemailer (Fallback)
    if (this.smtpTransporter) {
      try {
        console.log(`[EmailService] Enviando e-mail via SMTP para: ${customerEmail}`);
        const info = await this.smtpTransporter.sendMail({
          from: fromAddress,
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
    console.log('💡 DICA: Para enviar e-mails reais, configure RESEND_API_KEY no painel da Vercel ou no .env');
    console.log('============================================================\n');

    return {
      success: true,
      provider: 'dev-simulation',
      id: `mock_email_${Date.now()}`,
    };
  }
}

export const emailService = new EmailService();
