import { UpdateCarSpecificationUseCase } from '@application/usecases/car/specification/Update';

import { makeCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeUpdateCarSpecificationUseCase() {
  const carSpecificationsRepository = makeCarSpecificationsRepository();

  return new UpdateCarSpecificationUseCase(
    carSpecificationsRepository,
    carSpecificationsRepository,
    carSpecificationsRepository
  );
}
