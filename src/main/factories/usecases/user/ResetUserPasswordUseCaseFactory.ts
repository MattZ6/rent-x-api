import { ResetUserPasswordUseCase } from '@application/usecases/user/ResetUserPassword';

import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';
import { makePostgresUserTokensRepository } from '@main/factories/repositories/PostgresUserTokensRepositoryFactory';

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
