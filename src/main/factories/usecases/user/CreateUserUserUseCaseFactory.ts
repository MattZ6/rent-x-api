import { CreateUserUseCase } from '@data/usecases/user/CreateUser';

import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export function makeCreateUserUseCase() {
  const usersRepository = makePostgresUsersRepository();
  const hashProvider = makeBcryptjsHashProvider();

  return new CreateUserUseCase(usersRepository, hashProvider, usersRepository);
}
