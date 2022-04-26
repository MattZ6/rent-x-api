import { CreateCarCategoryController } from '@presentation/controllers/car/category/Create';
import { IController } from '@presentation/protocols';

import { makeCreateCarCategoryUseCase } from '@main/factories/usecases/car/category/Create';
import { makeCreateCarCategoryControllerValidation } from '@main/factories/validators/controllers/car/category/Create';

export function makeCreateCarCategoryController(): IController {
  const validation = makeCreateCarCategoryControllerValidation();
  const createCarCategoryUseCase = makeCreateCarCategoryUseCase();

  return new CreateCarCategoryController(validation, createCarCategoryUseCase);
}
