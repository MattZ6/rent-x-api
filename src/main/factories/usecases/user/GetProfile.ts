import { GetUserProfileUseCase } from '@application/usecases/user/GetProfile';

import { makeUsersRepository } from '@main/factories/repositories/User';

export function makeGetUserProfileUseCase() {
  const usersRepository = makeUsersRepository();

  return new GetUserProfileUseCase(usersRepository);
}
