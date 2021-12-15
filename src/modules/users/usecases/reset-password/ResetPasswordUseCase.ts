import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUserRefreshTokensRepository } from '@modules/users/repositories/IUserRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

type Request = {
  token: string;
  new_password: string;
};

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UserRefreshTokensRepository')
    private userRefreshTokensRepository: IUserRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: Request) {
    const { token, new_password } = data;

    const userToken = await this.userRefreshTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token not found', 404);
    }

    const { expires_in } = userToken;

    const hasExpired = this.dateProvider.isBefore(expires_in, new Date());

    if (hasExpired) {
      throw new AppError('Password reset token has expired', 422);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Token not found', 404);
    }

    user.password = await hash(new_password, 8);

    await this.usersRepository.update(user);

    await this.userRefreshTokensRepository.deleteById(userToken.id);
  }
}
