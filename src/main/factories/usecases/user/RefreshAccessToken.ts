import { RefreshUserAccessTokenUseCase } from '@application/usecases/user/RefreshAccessToken';

import { authConfig } from '@main/config/environment/auth';
import { makeJWTCryptographyProvider } from '@main/factories/providers/JWTCryptographyProviderFactory';
import { makeUuidProvider } from '@main/factories/providers/UuidProviderFactory';
import { makeUserTokensRepository } from '@main/factories/repositories/UserToken';

export function makeRefreshUserAccessTokenUseCase() {
  const postgresUserTokensRepository = makeUserTokensRepository();
  const jwtCryptographyProvider = makeJWTCryptographyProvider();
  const uuidProvider = makeUuidProvider();

  const refreshTokenExpiresInMillisseconds =
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS;

  return new RefreshUserAccessTokenUseCase(
    postgresUserTokensRepository,
    jwtCryptographyProvider,
    uuidProvider,
    refreshTokenExpiresInMillisseconds,
    postgresUserTokensRepository,
    postgresUserTokensRepository
  );
}
