import { UpdateCarCategoryUseCase } from '@application/usecases/car/category/Update';

import { makePostgresCarCategoriesRepository } from '@main/factories/repositories/PostgresCarCategoriesRepositoryFactory';

export function makeUpdateCarCategoryUseCase() {
  const postgresCarCategoriesRepository = makePostgresCarCategoriesRepository();

  return new UpdateCarCategoryUseCase(
    postgresCarCategoriesRepository,
    postgresCarCategoriesRepository,
    postgresCarCategoriesRepository
  );
}
