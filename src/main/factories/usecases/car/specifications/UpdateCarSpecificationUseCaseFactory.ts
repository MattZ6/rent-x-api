import { UpdateCarSpecificationUseCase } from '@application/usecases/car/specification/Update';

import { makePostgresCarSpecificationsRepository } from '@main/factories/repositories/PostgresCarSpecificationsRepositoryFactory';

export function makeUpdateCarSpecificationUseCase() {
  const postgresCarSpecificationsRepository =
    makePostgresCarSpecificationsRepository();

  return new UpdateCarSpecificationUseCase(
    postgresCarSpecificationsRepository,
    postgresCarSpecificationsRepository,
    postgresCarSpecificationsRepository
  );
}
