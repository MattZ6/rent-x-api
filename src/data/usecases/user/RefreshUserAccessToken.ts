import {
  TokenExpiredError,
  UserTokenNotFoundWithThisTokenError,
} from '@domain/errors';
import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshUserAccessToken';

import { IEncryptProvider } from '@data/protocols/providers/cryptography/cryptography';
import { IGenerateUuidProvider } from '@data/protocols/providers/uuid';
import {
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
  IFindUserTokenByTokenRepository,
} from '@data/protocols/repositories/user-token';

export class RefreshUserAccessTokenUseCase
  implements IRefreshUserAccessTokenUseCase
{
  constructor(
    private readonly findUserTokenByTokenRepository: IFindUserTokenByTokenRepository,
    private readonly encryptProvider: IEncryptProvider,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly refreshTokenExpiresTimeInMillisseconds: number,
    private readonly createUserTokenRepository: ICreateUserTokenRepository,
    private readonly deleteUserTokenByIdRepository: IDeleteUserTokenByIdRepository
  ) {}

  async execute(
    data: IRefreshUserAccessTokenUseCase.Input
  ): Promise<IRefreshUserAccessTokenUseCase.Output> {
    const { refresh_token } = data;

    const userToken = await this.findUserTokenByTokenRepository.findByToken(
      refresh_token
    );

    if (!userToken) {
      throw new UserTokenNotFoundWithThisTokenError();
    }

    const hasExpired = userToken.expires_in.getTime() < Date.now();

    if (hasExpired) {
      throw new TokenExpiredError();
    }

    const accessToken = await this.encryptProvider.encrypt({
      value: userToken.user_id,
    });

    const refreshToken = await this.generateUuidProvider.generate();

    const expiresIn = new Date(
      Date.now() + this.refreshTokenExpiresTimeInMillisseconds
    );

    await this.createUserTokenRepository.create({
      token: refreshToken,
      user_id: userToken.user_id,
      expires_in: expiresIn,
    });

    await this.deleteUserTokenByIdRepository.deleteById(userToken.id);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
