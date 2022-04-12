import { CreateCarSpecificationUseCase } from '@application/usecases/car/specification/CreateCarSpecification';

import { makePostgresCarSpecificationsRepository } from '@main/factories/repositories/PostgresCarSpecificationsRepositoryFactory';

export function makeCreateCarSpecificationUseCase() {
  const postgresCarSpecificationsRepository =
    makePostgresCarSpecificationsRepository();

  return new CreateCarSpecificationUseCase(
    postgresCarSpecificationsRepository,
    postgresCarSpecificationsRepository
  );
}
