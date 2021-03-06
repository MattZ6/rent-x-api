import { AuthenticateUserUseCase } from '@application/usecases/user/Authenticate';

import { authConfig } from '@main/config/environment/auth';
import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makeJWTCryptographyProvider } from '@main/factories/providers/JWTCryptographyProviderFactory';
import { makeUuidProvider } from '@main/factories/providers/UuidProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';
import { makeUserTokensRepository } from '@main/factories/repositories/UserToken';

export function makeAuthenticateUserUseCase() {
  const usersRepository = makeUsersRepository();
  const bcryptjsHashProvider = makeBcryptjsHashProvider();
  const jwtCryptographyProvider = makeJWTCryptographyProvider();
  const uuidProvider = makeUuidProvider();
  const userTokensRepository = makeUserTokensRepository();

  const refreshTokenExpiresInMillisseconds =
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS;

  return new AuthenticateUserUseCase(
    usersRepository,
    bcryptjsHashProvider,
    jwtCryptographyProvider,
    uuidProvider,
    refreshTokenExpiresInMillisseconds,
    userTokensRepository
  );
}
