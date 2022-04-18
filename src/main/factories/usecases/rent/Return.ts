import { ReturnRentUseCase } from '@application/usecases/rent/Return';

import { makePostgresRentsRepository } from '@main/factories/repositories/Rent';
import { makePostgresRentPaymentsRepository } from '@main/factories/repositories/RentPayment';

export function makeReturnRentUseCase() {
  const postgresRentsRepository = makePostgresRentsRepository();
  const postgresRentPaymentsRepository = makePostgresRentPaymentsRepository();

  return new ReturnRentUseCase(
    postgresRentsRepository,
    postgresRentPaymentsRepository,
    postgresRentsRepository
  );
}
