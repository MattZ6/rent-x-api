import { ReturnRentUseCase } from '@data/usecases/rent/ReturnRent';

import { makePostgresRentPaymentsRepository } from '@main/factories/repositories/PostgresRentPaymentsRepositoryFactory';
import { makePostgresRentsRepository } from '@main/factories/repositories/PostgresRentsRepositoryFactory';

export function makeReturnRentUseCase() {
  const postgresRentsRepository = makePostgresRentsRepository();
  const postgresRentPaymentsRepository = makePostgresRentPaymentsRepository();

  return new ReturnRentUseCase(
    postgresRentsRepository,
    postgresRentPaymentsRepository,
    postgresRentsRepository
  );
}
