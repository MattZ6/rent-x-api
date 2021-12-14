import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';

import { IUserRefreshTokensRepository } from '@modules/users/repositories/IUserRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

type Request = {
  email: string;
  password: string;
};

type Response = {
  access_token: string;
  refresh_token: string;
};

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserRefreshTokensRepository')
    private userRefreshTokensRepository: IUserRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(data: Request): Promise<Response> {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password invalid', 422);
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new AppError('Email or password invalid', 422);
    }

    const access_token = sign({}, auth.JWT_SECRET, {
      subject: user.id,
      expiresIn: auth.JWT_EXPIRES_IN,
    });

    const expiresInDays = auth.JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS;

    const expiresIn = this.dateProvider.addDays(new Date(), expiresInDays);

    const refresh_token = sign({ email }, auth.JWT_SECRET, {
      subject: user.id,
      expiresIn: `${expiresInDays}d`,
    });

    await this.userRefreshTokensRepository.create({
      user_id: user.id,
      expires_in: expiresIn,
      token: refresh_token,
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
