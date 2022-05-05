import { ResetUserPasswordUseCase } from '@application/usecases/user/ResetPassword';

import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';
import { makeUserTokensRepository } from '@main/factories/repositories/UserToken';

export function makeResetUserPasswordUseCase() {
  const postgresUserTokensRepository = makeUserTokensRepository();
  const postgresUsersRepository = makeUsersRepository();
  const bcryptjsHashProvider = makeBcryptjsHashProvider();

  return new ResetUserPasswordUseCase(
    postgresUserTokensRepository,
    bcryptjsHashProvider,
    postgresUsersRepository,
    postgresUserTokensRepository
  );
}
