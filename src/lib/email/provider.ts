export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailProvider {
  sendEmail(payload: EmailPayload): Promise<{ success: boolean; id?: string; error?: string }>;
}

export class ResendEmailProvider implements EmailProvider {
  private apiKey: string;
  private from: string;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || '';
    this.from = process.env.EMAIL_FROM || 'Ddesk Health <notifications@ddesk.com>';
  }

  async sendEmail(payload: EmailPayload): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!this.apiKey) {
      console.log(`[Email Service Mock Dispatch] To: ${payload.to} | Subject: ${payload.subject}`);
      return { success: true, id: `mock-mail-${Date.now()}` };
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: this.from,
          to: [payload.to],
          subject: payload.subject,
          html: payload.html
        })
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.message || `Resend error status ${response.status}`);
      }

      const data = await response.json();
      return { success: true, id: data.id };
    } catch (err: any) {
      console.error('Email dispatch failed:', err.message);
      return { success: false, error: err.message };
    }
  }
}

export function getEmailProvider(): EmailProvider {
  return new ResendEmailProvider();
}
