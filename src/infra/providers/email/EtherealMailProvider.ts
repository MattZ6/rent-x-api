import { readFile } from 'fs/promises';
import handlebars from 'handlebars';
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  Transporter,
} from 'nodemailer';

import { ISendMailProvider } from '@application/protocols/providers/mail';

export class EtherealMailProvider implements ISendMailProvider {
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

  async send(data: ISendMailProvider.Input): Promise<ISendMailProvider.Output> {
    if (!this.client) {
      await this.initialize();
    }

    const { from, to, subject, content } = data;

    let htmlContent: string;

    if (content.html) {
      const { template_path, template_variables } = content.html;

      const templateFileContent = await readFile(template_path);

      // TODO: Important! Create a template parser

      const parsedTemplate = handlebars.compile(
        templateFileContent.toString('utf-8')
      );

      htmlContent = parsedTemplate(template_variables);
    }

    const message = await this.client.sendMail({
      to,
      from,
      subject,
      text: content.text,
      html: htmlContent,
    });

    console.log(`Mail preview link: ${getTestMessageUrl(message)}`);
  }
}
