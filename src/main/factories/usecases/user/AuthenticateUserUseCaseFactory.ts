import { AuthenticateUserUseCase } from '@data/usecases/user/AuthenticateUser';

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

  const fiveDaysInMillisseconds = 5 * 24 * 60 * 60 * 1000;

  return new AuthenticateUserUseCase(
    usersRepository,
    bcryptjsHashProvider,
    jwtCryptographyProvider,
    uuidProvider,
    fiveDaysInMillisseconds,
    postgresUserTokensRepository
  );
}
