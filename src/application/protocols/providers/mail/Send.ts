/* eslint-disable @typescript-eslint/no-explicit-any */

interface ISendMailProvider<T = any> {
  send(data: ISendMailProvider.Input<T>): Promise<ISendMailProvider.Output>;
}

namespace ISendMailProvider {
  type Contact = {
    name: string;
    address: string;
  };

  type SendMailBodyHtml<T = any> = {
    template_path: string;
    template_variables?: T;
  };

  type SendMailBody<T = any> = {
    text: string;
    html?: SendMailBodyHtml<T>;
  };

  export type Input<T = any> = {
    from: Contact;
    to: Contact;
    subject: string;
    content: SendMailBody<T>;
  };

  export type Output = void;
}

export { ISendMailProvider };
