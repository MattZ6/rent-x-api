import { RemoveSpecificationFromCarUseCase } from '@application/usecases/car/specification/RemoveFromCar';

import { makeCarsRepository } from '@main/factories/repositories/Car';
import { makeCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeRemoveSpecificationFromCarUseCase() {
  const carsRepository = makeCarsRepository();
  const carSpecificationsRepository = makeCarSpecificationsRepository();

  return new RemoveSpecificationFromCarUseCase(
    carsRepository,
    carSpecificationsRepository,
    carSpecificationsRepository,
    carSpecificationsRepository
  );
}
