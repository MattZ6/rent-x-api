import { CreateCarCategoryController } from '@presentation/controllers/car/category/Create';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeCreateCarCategoryUseCase } from '@main/factories/usecases/car/category/Create';
import { makeCreateCarCategoryControllerValidation } from '@main/factories/validators/controllers/car/category/Create';

export function makeCreateCarCategoryController(): IController {
  const validation = makeCreateCarCategoryControllerValidation();
  const createCarCategoryUseCase = makeCreateCarCategoryUseCase();

  const controller = new CreateCarCategoryController(
    validation,
    createCarCategoryUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
