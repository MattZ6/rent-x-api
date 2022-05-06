import { UpdateCarCategoryController } from '@presentation/controllers/car/category/Update';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeUpdateCarCategoryUseCase } from '@main/factories/usecases/car/category/Update';
import { makeUpdateCarCategoryControllerValidation } from '@main/factories/validators/controllers/car/category/Update';

export function makeUpdateCarCategoryController(): IController {
  const validation = makeUpdateCarCategoryControllerValidation();
  const updateCarCategoryUseCase = makeUpdateCarCategoryUseCase();

  const controller = new UpdateCarCategoryController(
    validation,
    updateCarCategoryUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
