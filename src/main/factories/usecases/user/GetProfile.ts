import { GetUserProfileUseCase } from '@application/usecases/user/GetProfile';

import { makePostgresUsersRepository } from '@main/factories/repositories/User';

export function makeGetUserProfileUseCase() {
  const usersRepository = makePostgresUsersRepository();

  return new GetUserProfileUseCase(usersRepository);
}
