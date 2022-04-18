import { DeleteCarSpecificationUseCase } from '@application/usecases/car/specification/Delete';

import { makePostgresCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeDeleteCarSpecificationUseCase() {
  const postgresCarSpecificationsRepository =
    makePostgresCarSpecificationsRepository();

  return new DeleteCarSpecificationUseCase(
    postgresCarSpecificationsRepository,
    postgresCarSpecificationsRepository
  );
}
