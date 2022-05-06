import { CreateRentUseCase } from '@application/usecases/rent/Create';

import { rentConfig } from '@main/config/environment/rent';
import { makeCarsRepository } from '@main/factories/repositories/Car';
import { makeRentsRepository } from '@main/factories/repositories/Rent';
import { makeUsersRepository } from '@main/factories/repositories/User';

export function makeCreateRentUseCase() {
  const usersRepository = makeUsersRepository();
  const rentsRepository = makeRentsRepository();
  const carsRepository = makeCarsRepository();

  return new CreateRentUseCase(
    usersRepository,
    rentsRepository,
    carsRepository,
    rentConfig.RENT_MIN_DURATION_IN_MILLISSECONDS,
    rentsRepository,
    rentsRepository
  );
}
