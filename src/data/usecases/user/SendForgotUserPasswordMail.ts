import { UserNotFoundWithThisEmailError } from '@domain/errors';
import { ISendForgotUserPasswordMailUseCase } from '@domain/usecases/user/SendForgotUserPasssordMail';

import { ISendMailProvider } from '@data/protocols/providers/mail/SendMailProvider';
import { IGenerateUuidProvider } from '@data/protocols/providers/uuid';
import { IFindUserByEmailRepository } from '@data/protocols/repositories/user';
import { ICreateUserTokenRepository } from '@data/protocols/repositories/user-token';

export class SendForgotUserPasswordMailUseCase
  implements ISendForgotUserPasswordMailUseCase
{
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly passwordResetLinkExpiresTimeInMillisseconds: number,
    private readonly createUserTokenRepository: ICreateUserTokenRepository,
    private readonly emailData: ISendForgotUserPasswordMailUseCase.EmailData,
    private readonly passwordResetLinkData: ISendForgotUserPasswordMailUseCase.PasswordResetLinkData,
    private readonly sendMailProvider: ISendMailProvider<ISendForgotUserPasswordMailUseCase.HtmlTemplateVariables>
  ) {}

  async execute(
    data: ISendForgotUserPasswordMailUseCase.Input
  ): Promise<ISendForgotUserPasswordMailUseCase.Output> {
    const { email } = data;

    const user = await this.findUserByEmailRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundWithThisEmailError();
    }

    const token = await this.generateUuidProvider.generate();

    const expirationDate = new Date(
      Date.now() + this.passwordResetLinkExpiresTimeInMillisseconds
    );

    await this.createUserTokenRepository.create({
      user_id: user.id,
      token,
      expires_in: expirationDate,
    });

    const [userFirstName] = user.name.trim().split(' ');

    const link = `${this.passwordResetLinkData.base_url}?${this.passwordResetLinkData.query_param_name}=${token}`;

    await this.sendMailProvider.send({
      from: {
        name: this.emailData.from_email.name,
        address: this.emailData.from_email.address,
      },
      to: {
        name: user.name,
        address: user.email,
      },
      subject: this.emailData.subject,
      content: {
        text: this.emailData.text_content,
        html: {
          template_path: this.emailData.html_template_path,
          template_variables: {
            user_first_name: userFirstName,
            password_reset_link: link,
          },
        },
      },
    });
  }
}
