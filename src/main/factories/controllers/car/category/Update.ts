import { UpdateCarCategoryController } from '@presentation/controllers/car/category/Update';
import { IController } from '@presentation/protocols';

import { makeUpdateCarCategoryUseCase } from '@main/factories/usecases/car/category/Update';

export function makeUpdateCarCategoryController(): IController {
  const updateCarCategoryUseCase = makeUpdateCarCategoryUseCase();

  return new UpdateCarCategoryController(updateCarCategoryUseCase);
}
