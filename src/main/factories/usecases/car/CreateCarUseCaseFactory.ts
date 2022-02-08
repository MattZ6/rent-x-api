import { CreateCarUseCase } from '@data/usecases/car/CreateCar';

import { makePostgresCarBrandsRepository } from '@main/factories/repositories/PostgresCarBrandsRepositoryFactory';
import { makePostgresCarCategoriesRepository } from '@main/factories/repositories/PostgresCarCategoriesRepositoryFactory';
import { makePostgresCarSpecificationsRepository } from '@main/factories/repositories/PostgresCarSpecificationsRepositoryFactory';
import { makePostgresCarsRepository } from '@main/factories/repositories/PostgresCarsRepositoryFactory';

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
