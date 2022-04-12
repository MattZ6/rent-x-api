import { ListAllCarCategoriesUseCase } from '@application/usecases/car/category/ListAllCarCategories';

import { makePostgresCarCategoriesRepository } from '@main/factories/repositories/PostgresCarCategoriesRepositoryFactory';

export function makeListAllCarCategoriesUseCase() {
  const postgresCarCategoriesRepository = makePostgresCarCategoriesRepository();

  return new ListAllCarCategoriesUseCase(postgresCarCategoriesRepository);
}
