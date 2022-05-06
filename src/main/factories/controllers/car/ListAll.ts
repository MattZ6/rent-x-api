import { ListAllCarsController } from '@presentation/controllers/car/ListAll';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeListAllCarsUseCase } from '@main/factories/usecases/car/ListAll';
import { makeListAllCarsControllerValidation } from '@main/factories/validators/controllers/car/ListAll';

export function makeListCarsController(): IController {
  const validation = makeListAllCarsControllerValidation();
  const listAllCarsUseCase = makeListAllCarsUseCase();

  const controller = new ListAllCarsController(validation, listAllCarsUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
