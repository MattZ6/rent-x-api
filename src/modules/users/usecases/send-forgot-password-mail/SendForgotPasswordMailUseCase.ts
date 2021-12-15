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

    this.mailProvider.sendMail({
      to: {
        name: user.name,
        address: user.email,
      },
      subject: 'Recuperação de senha',
      body: `O link para o reset de senha é ${token}`,
    });
  }
}
