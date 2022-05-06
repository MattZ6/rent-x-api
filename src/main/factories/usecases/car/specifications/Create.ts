import { CreateCarSpecificationUseCase } from '@application/usecases/car/specification/Create';

import { makeCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeCreateCarSpecificationUseCase() {
  const carSpecificationsRepository = makeCarSpecificationsRepository();

  return new CreateCarSpecificationUseCase(
    carSpecificationsRepository,
    carSpecificationsRepository
  );
}
