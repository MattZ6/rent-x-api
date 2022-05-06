import { ReturnRentUseCase } from '@application/usecases/rent/Return';

import { makeDurationProvider } from '@main/factories/providers/DurationProviderFactory';
import { makeRentsRepository } from '@main/factories/repositories/Rent';
import { makeRentPaymentsRepository } from '@main/factories/repositories/RentPayment';

export function makeReturnRentUseCase() {
  const rentsRepository = makeRentsRepository();
  const durationProvider = makeDurationProvider();
  const rentPaymentsRepository = makeRentPaymentsRepository();

  return new ReturnRentUseCase(
    rentsRepository,
    durationProvider,
    rentPaymentsRepository,
    rentsRepository
  );
}
