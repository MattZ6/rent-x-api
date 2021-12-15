type MailContact = {
  name: string;
  address: string;
};

type SendMailBodyHtml<T = any> = {
  template_path: string;
  template_variables?: T;
};

type SendMailBody<T = any> = {
  text?: string;
  html?: SendMailBodyHtml<T>;
};

export type SendMailDTO<T = any> = {
  from?: MailContact;
  to: MailContact;
  subject: string;
  body: SendMailBody<T>;
};

export interface IMailProvider {
  sendMail<T = any>(data: SendMailDTO<T>): Promise<void>;
}
