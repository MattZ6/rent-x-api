import { CreateCarSpecificationUseCase } from '@application/usecases/car/specification/Create';

import { makePostgresCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeCreateCarSpecificationUseCase() {
  const postgresCarSpecificationsRepository =
    makePostgresCarSpecificationsRepository();

  return new CreateCarSpecificationUseCase(
    postgresCarSpecificationsRepository,
    postgresCarSpecificationsRepository
  );
}
