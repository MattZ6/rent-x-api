import { ReturnRentUseCase } from '@application/usecases/rent/Return';

import { makeDurationProvider } from '@main/factories/providers/DurationProviderFactory';
import { makePostgresRentsRepository } from '@main/factories/repositories/Rent';
import { makePostgresRentPaymentsRepository } from '@main/factories/repositories/RentPayment';

export function makeReturnRentUseCase() {
  const postgresRentsRepository = makePostgresRentsRepository();
  const durationProvider = makeDurationProvider();
  const postgresRentPaymentsRepository = makePostgresRentPaymentsRepository();

  return new ReturnRentUseCase(
    postgresRentsRepository,
    durationProvider,
    postgresRentPaymentsRepository,
    postgresRentsRepository
  );
}
