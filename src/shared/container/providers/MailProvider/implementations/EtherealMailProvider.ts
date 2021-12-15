import { readFileSync } from 'fs';
import handlebars from 'handlebars';
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
    if (!this.client) {
      await this.initialize();
    }

    const { from, to, subject, body } = data;

    let htmlContent: string;

    if (body.html) {
      const { template_path, template_variables } = body.html;

      const templateFileContent = readFileSync(template_path).toString('utf-8');

      const parsedTemplate = handlebars.compile(templateFileContent);

      htmlContent = parsedTemplate(template_variables);
    }

    const message = await this.client.sendMail({
      to,
      from: from ?? {
        name: 'Rent-X Team',
        address: 'noreply@rentx.com.br',
      },
      subject,
      text: body.text,
      html: htmlContent,
    });

    console.log(`Mail preview link: ${getTestMessageUrl(message)}`);
  }
}
