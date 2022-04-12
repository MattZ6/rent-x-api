import { CreateRentUseCase } from '@application/usecases/rent/CreateRent';

import { rentConfig } from '@main/config/environment/rent';
import { makePostgresCarsRepository } from '@main/factories/repositories/PostgresCarsRepositoryFactory';
import { makePostgresRentsRepository } from '@main/factories/repositories/PostgresRentsRepositoryFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';

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
