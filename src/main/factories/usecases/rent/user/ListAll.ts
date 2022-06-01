import { ListAllUserRentalsUseCase } from '@application/usecases/rent/user/ListAll';

import { rentConfig } from '@main/config/environment/rent';
import { makeRentsRepository } from '@main/factories/repositories/Rent';
import { makeUsersRepository } from '@main/factories/repositories/User';

export function makeListAllUserRentalsUseCase() {
  const usersRepository = makeUsersRepository();
  const rentsRepository = makeRentsRepository();

  return new ListAllUserRentalsUseCase(
    usersRepository,
    rentConfig.DEFAULT_LIMIT,
    rentConfig.DEFAULT_OFFSET,
    rentsRepository
  );
}
