type MailContact = {
  name: string;
  address: string;
};

export type SendMailDTO = {
  to: MailContact;
  subject: string;
  body: string;
};

export interface IMailProvider {
  sendMail(data: SendMailDTO): Promise<void>;
}
