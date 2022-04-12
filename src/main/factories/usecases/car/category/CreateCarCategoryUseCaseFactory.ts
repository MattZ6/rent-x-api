import { CreateCarCategoryUseCase } from '@application/usecases/car/category/CreateCarCategory';

import { makePostgresCarCategoriesRepository } from '@main/factories/repositories/PostgresCarCategoriesRepositoryFactory';

export function makeCreateCarCategoryUseCase() {
  const postgresCarCategoriesRepository = makePostgresCarCategoriesRepository();

  return new CreateCarCategoryUseCase(
    postgresCarCategoriesRepository,
    postgresCarCategoriesRepository
  );
}
