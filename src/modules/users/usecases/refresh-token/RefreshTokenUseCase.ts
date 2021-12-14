import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';

import { IUserRefreshTokensRepository } from '@modules/users/repositories/IUserRefreshTokensRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

type Request = {
  refresh_token: string;
};

type JwtCustomPayload = JwtPayload & {
  email: string;
};

type Response = {
  access_token: string;
  refresh_token: string;
};

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserRefreshTokensRepository')
    private userRefreshTokensRepository: IUserRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(data: Request): Promise<Response> {
    const { refresh_token } = data;

    const { email, sub } = verify(
      refresh_token,
      auth.JWT_SECRET
    ) as JwtCustomPayload;

    const userId = sub;

    const refreshToken =
      await this.userRefreshTokensRepository.findByTokenFromUser({
        token: refresh_token,
        user_id: userId,
      });

    if (!refreshToken) {
      throw new AppError('Refresh token does noe exists', 404);
    }

    await this.userRefreshTokensRepository.deleteById(refreshToken.id);

    const access_token = sign({}, auth.JWT_SECRET, {
      subject: userId,
      expiresIn: auth.JWT_EXPIRES_IN,
    });

    const expiresInDays = auth.JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS;

    const expiresIn = this.dateProvider.addDays(new Date(), expiresInDays);

    const newRefreshToken = sign({ email }, auth.JWT_SECRET, {
      subject: userId,
      expiresIn: `${expiresInDays}d`,
    });

    await this.userRefreshTokensRepository.create({
      user_id: userId,
      expires_in: expiresIn,
      token: refresh_token,
    });

    return {
      access_token,
      refresh_token: newRefreshToken,
    };
  }
}
