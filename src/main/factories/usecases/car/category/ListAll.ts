import { ListAllCarCategoriesUseCase } from '@application/usecases/car/category/ListAll';

import { makePostgresCarCategoriesRepository } from '@main/factories/repositories/CarCategory';

export function makeListAllCarCategoriesUseCase() {
  const postgresCarCategoriesRepository = makePostgresCarCategoriesRepository();

  return new ListAllCarCategoriesUseCase(postgresCarCategoriesRepository);
}
