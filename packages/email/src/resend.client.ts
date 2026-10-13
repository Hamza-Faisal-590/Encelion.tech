import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResendClient(): Resend {
  if (!_resend) {
    const apiKey = process.env['RESEND_API_KEY'];
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set. Email dispatch will fail if called.');
    }
    _resend = new Resend(apiKey || 'dummy-key');
  }
  return _resend;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions) {
  const resend = getResendClient();
  const defaultFrom = process.env['EMAIL_FROM'] || 'Encelion AI <noreply@encelion.tech>';
  
  return await resend.emails.send({
    from: options.from || defaultFrom,
    to: options.to,
    subject: options.subject,
    html: options.html,
    reply_to: options.replyTo,
  });
}
