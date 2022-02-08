import { CreateCarCategoryController } from '@presentation/controllers/car/category/CreateCarCategory';
import { IController } from '@presentation/protocols';

import { makeCreateCarCategoryUseCase } from '@main/factories/usecases/car/category/CreateCarCategoryUseCaseFactory';

export function makeCreateCarCategoryController(): IController {
  const createCarCategoryUseCase = makeCreateCarCategoryUseCase();

  return new CreateCarCategoryController(createCarCategoryUseCase);
}
