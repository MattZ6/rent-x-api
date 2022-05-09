import { UpdateUserEmailUseCase } from '@application/usecases/user/UpdateEmail';

import { makeUsersRepository } from '@main/factories/repositories/User';

export function makeUpdateUserEmailUseCase() {
  const usersRepository = makeUsersRepository();

  return new UpdateUserEmailUseCase(usersRepository, usersRepository);
}
