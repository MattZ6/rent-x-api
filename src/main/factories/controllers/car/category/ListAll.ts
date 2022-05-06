import { ListAllCarCategoriesController } from '@presentation/controllers/car/category/ListAll';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeListAllCarCategoriesUseCase } from '@main/factories/usecases/car/category/ListAll';
import { makeListAllCarCategoriesControllerValidation } from '@main/factories/validators/controllers/car/category/ListAll';

export function makeListAllCarCategoriesController(): IController {
  const validation = makeListAllCarCategoriesControllerValidation();
  const listAllCarCategoriesUseCase = makeListAllCarCategoriesUseCase();

  const controller = new ListAllCarCategoriesController(
    validation,
    listAllCarCategoriesUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
