import { AddSpecificationsToCarUseCase } from '@application/usecases/car/specification/AddToCar';

import { makeCarsRepository } from '@main/factories/repositories/Car';
import { makeCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeAddSpecificationsToCarUseCase() {
  const carsRepository = makeCarsRepository();
  const carSpecificationsRepository = makeCarSpecificationsRepository();

  return new AddSpecificationsToCarUseCase(
    carsRepository,
    carSpecificationsRepository,
    carSpecificationsRepository,
    carSpecificationsRepository
  );
}
