import { ReturnRentUseCase } from '@application/usecases/rent/Return';

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
