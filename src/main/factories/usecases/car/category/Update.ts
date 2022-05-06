import { UpdateCarCategoryUseCase } from '@application/usecases/car/category/Update';

import { makeCarCategoriesRepository } from '@main/factories/repositories/CarCategory';

export function makeUpdateCarCategoryUseCase() {
  const carCategoriesRepository = makeCarCategoriesRepository();

  return new UpdateCarCategoryUseCase(
    carCategoriesRepository,
    carCategoriesRepository,
    carCategoriesRepository
  );
}
