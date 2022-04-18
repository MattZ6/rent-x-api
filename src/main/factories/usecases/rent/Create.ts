import { CreateRentUseCase } from '@application/usecases/rent/Create';

import { rentConfig } from '@main/config/environment/rent';
import { makePostgresCarsRepository } from '@main/factories/repositories/Car';
import { makePostgresRentsRepository } from '@main/factories/repositories/Rent';
import { makePostgresUsersRepository } from '@main/factories/repositories/User';

export function makeCreateRentUseCase() {
  const postgresUsersRepository = makePostgresUsersRepository();
  const postgresRentsRepository = makePostgresRentsRepository();
  const postgresCarsRepository = makePostgresCarsRepository();

  return new CreateRentUseCase(
    postgresUsersRepository,
    postgresRentsRepository,
    postgresCarsRepository,
    rentConfig.RENT_MIN_DURATION_IN_MILLISSECONDS,
    postgresRentsRepository,
    postgresRentsRepository
  );
}
