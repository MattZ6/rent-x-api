import { CreateCarCategoryUseCase } from '@application/usecases/car/category/Create';

import { makeCarCategoriesRepository } from '@main/factories/repositories/CarCategory';

export function makeCreateCarCategoryUseCase() {
  const carCategoriesRepository = makeCarCategoriesRepository();

  return new CreateCarCategoryUseCase(
    carCategoriesRepository,
    carCategoriesRepository
  );
}
