import { CreateCarUseCase } from '@application/usecases/car/Create';

import { makeCarsRepository } from '@main/factories/repositories/Car';
import { makeCarBrandsRepository } from '@main/factories/repositories/CarBrand';
import { makeCarCategoriesRepository } from '@main/factories/repositories/CarCategory';
import { makeCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeCreateCarUseCase() {
  const carsRepository = makeCarsRepository();
  const carBrandsRepository = makeCarBrandsRepository();
  const carCategoriesRepository = makeCarCategoriesRepository();
  const carSpecificationsRepository = makeCarSpecificationsRepository();

  return new CreateCarUseCase(
    carsRepository,
    carBrandsRepository,
    carCategoriesRepository,
    carSpecificationsRepository,
    carsRepository
  );
}
