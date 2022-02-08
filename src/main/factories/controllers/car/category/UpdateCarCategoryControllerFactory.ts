import { UpdateCarCategoryController } from '@presentation/controllers/car/category/UpdateCarCategory';
import { IController } from '@presentation/protocols';

import { makeUpdateCarCategoryUseCase } from '@main/factories/usecases/car/category/UpdateCarCategoryUseCaseFactory';

export function makeUpdateCarCategoryController(): IController {
  const updateCarCategoryUseCase = makeUpdateCarCategoryUseCase();

  return new UpdateCarCategoryController(updateCarCategoryUseCase);
}
