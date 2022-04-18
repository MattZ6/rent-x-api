import { CreateCarUseCase } from '@application/usecases/car/Create';

import { makePostgresCarsRepository } from '@main/factories/repositories/Car';
import { makePostgresCarBrandsRepository } from '@main/factories/repositories/CarBrand';
import { makePostgresCarCategoriesRepository } from '@main/factories/repositories/CarCategory';
import { makePostgresCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeCreateCarUseCase() {
  const postgresCarsRepository = makePostgresCarsRepository();
  const postgresCarBrandsRepository = makePostgresCarBrandsRepository();
  const postgresCarCategoriesRepository = makePostgresCarCategoriesRepository();
  const postgresCarSpecificationsRepository =
    makePostgresCarSpecificationsRepository();

  return new CreateCarUseCase(
    postgresCarsRepository,
    postgresCarBrandsRepository,
    postgresCarCategoriesRepository,
    postgresCarSpecificationsRepository,
    postgresCarsRepository
  );
}
