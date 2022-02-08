import { ISendMailProvider } from '@data/protocols/providers/mail';

export class SendMailProviderSpy implements ISendMailProvider {
  async send(_: ISendMailProvider.Input): Promise<void> {
    // That's all folks 🥕
  }
}
