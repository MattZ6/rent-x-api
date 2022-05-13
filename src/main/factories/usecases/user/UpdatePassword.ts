import { UpdateUserPasswordUseCase } from '@application/usecases/user/UpdatePassword';

import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';

export function makeUpdateUserPasswordUseCase() {
  const usersRepository = makeUsersRepository();
  const hashProvider = makeBcryptjsHashProvider();

  return new UpdateUserPasswordUseCase(
    usersRepository,
    hashProvider,
    hashProvider,
    usersRepository
  );
}
