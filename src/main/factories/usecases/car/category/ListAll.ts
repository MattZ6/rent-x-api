import { ListAllCarCategoriesUseCase } from '@application/usecases/car/category/ListAll';

import { carCategoryConfig } from '@main/config/environment/carCategory';
import { makeCarCategoriesRepository } from '@main/factories/repositories/CarCategory';

export function makeListAllCarCategoriesUseCase() {
  const carCategoriesRepository = makeCarCategoriesRepository();

  return new ListAllCarCategoriesUseCase(
    carCategoryConfig.DEFAULT_SORT_BY,
    carCategoryConfig.DEFAULT_ORDER_BY,
    carCategoryConfig.DEFAULT_LIMIT,
    carCategoryConfig.DEFAULT_OFFSET,
    carCategoriesRepository
  );
}
