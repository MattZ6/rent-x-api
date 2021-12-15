import {
  createTestAccount,
  getTestMessageUrl,
  createTransport,
  Transporter,
} from 'nodemailer';

import { IMailProvider, SendMailDTO } from '../IMailProvider';

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      const testAccount = await createTestAccount();

      this.client = createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (error) {
      console.error('Fail to initialize Ethereal provider', error);
    }
  }

  async sendMail(data: SendMailDTO): Promise<void> {
    const { to, subject, body } = data;

    const message = await this.client.sendMail({
      to,
      from: {
        name: 'Rent-X Team',
        address: 'noreply@rentx.com.br',
      },
      subject,
      text: body,
      html: body,
    });

    console.log(`Mail preview link: ${getTestMessageUrl(message)}`);
  }
}
