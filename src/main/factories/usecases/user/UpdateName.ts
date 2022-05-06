import { UpdateUserNameUseCase } from '@application/usecases/user/UpdateName';

import { makeUsersRepository } from '@main/factories/repositories/User';

export function makeUpdateUserNameUseCase() {
  const usersRepository = makeUsersRepository();

  return new UpdateUserNameUseCase(usersRepository, usersRepository);
}
