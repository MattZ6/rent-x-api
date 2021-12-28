import { RefreshUserAccessTokenUseCase } from '@data/usecases/user/RefreshUserAccessToken';

import { makeJWTCryptographyProvider } from '@main/factories/providers/JWTCryptographyProviderFactory';
import { makeUuidProvider } from '@main/factories/providers/UuidProviderFactory';
import { makePostgresUserTokensRepository } from '@main/factories/repositories/PostgresUserTokensRepositoryFactory';

export function makeRefreshUserAccessTokenUseCase() {
  const postgresUserTokensRepository = makePostgresUserTokensRepository();
  const jwtCryptographyProvider = makeJWTCryptographyProvider();
  const uuidProvider = makeUuidProvider();

  const fiveDaysInMillisseconds = 5 * 24 * 60 * 60 * 1000;

  return new RefreshUserAccessTokenUseCase(
    postgresUserTokensRepository,
    jwtCryptographyProvider,
    uuidProvider,
    fiveDaysInMillisseconds,
    postgresUserTokensRepository,
    postgresUserTokensRepository
  );
}
