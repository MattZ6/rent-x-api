import { IMailProvider, SendMailDTO } from '../IMailProvider';

export class InMemoryMailProvider implements IMailProvider {
  async sendMail(_: SendMailDTO): Promise<void> {
    // That's all folks
  }
}
