import { ListAllUserRentalsUseCase } from '@application/usecases/rent/user/ListAll';

import { rentConfig } from '@main/config/environment/rent';
import { makeRentsRepository } from '@main/factories/repositories/Rent';

export function makeListAllUserRentalsUseCase() {
  const rentsRepository = makeRentsRepository();

  return new ListAllUserRentalsUseCase(
    rentConfig.DEFAULT_LIMIT,
    rentConfig.DEFAULT_OFFSET,
    rentsRepository
  );
}
