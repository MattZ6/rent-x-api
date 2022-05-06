import { DeleteCarSpecificationUseCase } from '@application/usecases/car/specification/Delete';

import { makeCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeDeleteCarSpecificationUseCase() {
  const carSpecificationsRepository = makeCarSpecificationsRepository();

  return new DeleteCarSpecificationUseCase(
    carSpecificationsRepository,
    carSpecificationsRepository
  );
}
