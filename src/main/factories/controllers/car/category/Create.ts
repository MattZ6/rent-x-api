import { CreateCarCategoryController } from '@presentation/controllers/car/category/Create';
import { IController } from '@presentation/protocols';

import { makeCreateCarCategoryUseCase } from '@main/factories/usecases/car/category/Create';

export function makeCreateCarCategoryController(): IController {
  const createCarCategoryUseCase = makeCreateCarCategoryUseCase();

  return new CreateCarCategoryController(createCarCategoryUseCase);
}
