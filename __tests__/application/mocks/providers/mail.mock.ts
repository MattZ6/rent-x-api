import { ISendMailProvider } from '@application/protocols/providers/mail';

export class SendMailProviderSpy implements ISendMailProvider {
  async send(_: ISendMailProvider.Input): Promise<void> {
    // That's all folks 🥕
  }
}
