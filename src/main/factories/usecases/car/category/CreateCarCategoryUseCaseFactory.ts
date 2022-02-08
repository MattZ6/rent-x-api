import { CreateCarCategoryUseCase } from '@data/usecases/car/category/CreateCarCategory';

import { makePostgresCarCategoriesRepository } from '@main/factories/repositories/PostgresCarCategoriesRepositoryFactory';

export function makeCreateCarCategoryUseCase() {
  const postgresCarCategoriesRepository = makePostgresCarCategoriesRepository();

  return new CreateCarCategoryUseCase(
    postgresCarCategoriesRepository,
    postgresCarCategoriesRepository
  );
}
