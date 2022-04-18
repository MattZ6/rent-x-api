import { ResetUserPasswordUseCase } from '@application/usecases/user/ResetPassword';

import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/User';
import { makePostgresUserTokensRepository } from '@main/factories/repositories/UserToken';

export function makeResetUserPasswordUseCase() {
  const postgresUserTokensRepository = makePostgresUserTokensRepository();
  const postgresUsersRepository = makePostgresUsersRepository();
  const bcryptjsHashProvider = makeBcryptjsHashProvider();

  return new ResetUserPasswordUseCase(
    postgresUserTokensRepository,
    postgresUsersRepository,
    bcryptjsHashProvider,
    postgresUsersRepository,
    postgresUserTokensRepository
  );
}
