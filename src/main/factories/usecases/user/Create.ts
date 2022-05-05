import { CreateUserUseCase } from '@application/usecases/user/Create';

import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';

export function makeCreateUserUseCase() {
  const usersRepository = makeUsersRepository();
  const hashProvider = makeBcryptjsHashProvider();

  return new CreateUserUseCase(
    usersRepository,
    usersRepository,
    hashProvider,
    usersRepository
  );
}
