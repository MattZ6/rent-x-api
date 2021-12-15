import { inject, injectable } from 'tsyringe';
import { v4 as generateUuid } from 'uuid';

import { IUserRefreshTokensRepository } from '@modules/users/repositories/IUserRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
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
    private dateProvider: IDateProvider
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
  }
}
