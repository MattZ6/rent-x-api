import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as generateUuid } from 'uuid';

import { IUserRefreshTokensRepository } from '@modules/users/repositories/IUserRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

type Request = {
  email: string;
};

type EmailTemplateVariables = {
  first_name: string;
  link: string;
};

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserRefreshTokensRepository')
    private userRefreshTokensRepository: IUserRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(data: Request) {
    const { email } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists', 404);
    }

    const token = generateUuid();

    const expiresIn = this.dateProvider.addHours(new Date(), 3);

    await this.userRefreshTokensRepository.create({
      user_id: user.id,
      token,
      expires_in: expiresIn,
    });

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

    const [userFirstName] = user.name.split(' ');
    const resetPasswordLink = `${process.env.RESET_PASSWORD_URL}?${process.env.RESET_PASSWORD_TOKEN_PARAM_NAME}=${token}`;

    this.mailProvider.sendMail<EmailTemplateVariables>({
      to: {
        name: user.name,
        address: user.email,
      },
      subject: 'Recuperação de senha',
      body: {
        text: `O link para o reset de senha é ${token}`,
        html: {
          template_path: templatePath,
          template_variables: {
            first_name: userFirstName,
            link: resetPasswordLink,
          },
        },
      },
    });
  }
}
