import { AuthenticateUserUseCase } from '@application/usecases/user/Authenticate';

import { authConfig } from '@main/config/environment/auth';
import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makeJWTCryptographyProvider } from '@main/factories/providers/JWTCryptographyProviderFactory';
import { makeUuidProvider } from '@main/factories/providers/UuidProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';
import { makePostgresUserTokensRepository } from '@main/factories/repositories/PostgresUserTokensRepositoryFactory';

export function makeAuthenticateUserUseCase() {
  const usersRepository = makePostgresUsersRepository();
  const bcryptjsHashProvider = makeBcryptjsHashProvider();
  const jwtCryptographyProvider = makeJWTCryptographyProvider();
  const uuidProvider = makeUuidProvider();
  const postgresUserTokensRepository = makePostgresUserTokensRepository();

  const refreshTokenExpiresInMillisseconds =
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS;

  return new AuthenticateUserUseCase(
    usersRepository,
    bcryptjsHashProvider,
    jwtCryptographyProvider,
    uuidProvider,
    refreshTokenExpiresInMillisseconds,
    postgresUserTokensRepository
  );
}
