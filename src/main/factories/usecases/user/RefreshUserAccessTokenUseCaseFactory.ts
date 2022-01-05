import { RefreshUserAccessTokenUseCase } from '@data/usecases/user/RefreshUserAccessToken';

import { authConfig } from '@main/config/environment/auth';
import { makeJWTCryptographyProvider } from '@main/factories/providers/JWTCryptographyProviderFactory';
import { makeUuidProvider } from '@main/factories/providers/UuidProviderFactory';
import { makePostgresUserTokensRepository } from '@main/factories/repositories/PostgresUserTokensRepositoryFactory';

export function makeRefreshUserAccessTokenUseCase() {
  const postgresUserTokensRepository = makePostgresUserTokensRepository();
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
