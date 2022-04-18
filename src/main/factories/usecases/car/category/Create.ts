import { CreateCarCategoryUseCase } from '@application/usecases/car/category/Create';

import { makePostgresCarCategoriesRepository } from '@main/factories/repositories/CarCategory';

export function makeCreateCarCategoryUseCase() {
  const postgresCarCategoriesRepository = makePostgresCarCategoriesRepository();

  return new CreateCarCategoryUseCase(
    postgresCarCategoriesRepository,
    postgresCarCategoriesRepository
  );
}
