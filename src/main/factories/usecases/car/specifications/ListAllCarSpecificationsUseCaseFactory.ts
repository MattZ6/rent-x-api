import { ListAllCarSpecificationsUseCase } from '@application/usecases/car/specification/ListAll';

import { makePostgresCarSpecificationsRepository } from '@main/factories/repositories/PostgresCarSpecificationsRepositoryFactory';

export function makeListAllCarSpecificationsUseCase() {
  const postgresCarSpecificationsRepository =
    makePostgresCarSpecificationsRepository();

  return new ListAllCarSpecificationsUseCase(
    postgresCarSpecificationsRepository
  );
}
