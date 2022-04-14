import {
  UserTokenExpiredError,
  UserTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';
import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshUserAccessToken';

import { IEncryptProvider } from '@application/protocols/providers/cryptography/cryptography';
import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';
import {
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
  IFindUserTokenByTokenRepository,
} from '@application/protocols/repositories/user-token';

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

    const userToken = await this.findUserTokenByTokenRepository.findByToken({
      token: refresh_token,
    });

    if (!userToken) {
      throw new UserTokenNotFoundWithProvidedTokenError();
    }

    const hasExpired = userToken.expires_in.getTime() < Date.now();

    if (hasExpired) {
      throw new UserTokenExpiredError();
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

    await this.deleteUserTokenByIdRepository.deleteById({ id: userToken.id });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
