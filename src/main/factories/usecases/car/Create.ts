import { CreateCarUseCase } from '@application/usecases/car/Create';

import { makePostgresCarsRepository } from '@main/factories/repositories/Car';
import { makeCarBrandsRepository } from '@main/factories/repositories/CarBrand';
import { makeCarCategoriesRepository } from '@main/factories/repositories/CarCategory';
import { makePostgresCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeCreateCarUseCase() {
  const carsRepository = makePostgresCarsRepository();
  const carBrandsRepository = makeCarBrandsRepository();
  const carCategoriesRepository = makeCarCategoriesRepository();
  const carSpecificationsRepository = makePostgresCarSpecificationsRepository();

  return new CreateCarUseCase(
    carsRepository,
    carBrandsRepository,
    carCategoriesRepository,
    carSpecificationsRepository,
    carsRepository
  );
}
