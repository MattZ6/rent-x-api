import { ResetUserPasswordUseCase } from '@application/usecases/user/ResetPassword';

import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';
import { makePostgresUserTokensRepository } from '@main/factories/repositories/UserToken';

export function makeResetUserPasswordUseCase() {
  const postgresUserTokensRepository = makePostgresUserTokensRepository();
  const postgresUsersRepository = makeUsersRepository();
  const bcryptjsHashProvider = makeBcryptjsHashProvider();

  return new ResetUserPasswordUseCase(
    postgresUserTokensRepository,
    bcryptjsHashProvider,
    postgresUsersRepository,
    postgresUserTokensRepository
  );
}
