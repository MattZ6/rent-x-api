import { ListAllAvailableCarsController } from '@presentation/controllers/car/ListAllAvailable';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeListAllAvailableCarsUseCase } from '@main/factories/usecases/car/ListAllAvailable';
import { makeListAllAvailableCarsControllerValidation } from '@main/factories/validators/controllers/car/ListAllAvailable';

export function makeListAllAvailableCarsController(): IController {
  const validation = makeListAllAvailableCarsControllerValidation();
  const listAllAvailableCarsUseCase = makeListAllAvailableCarsUseCase();

  const controller = new ListAllAvailableCarsController(
    validation,
    listAllAvailableCarsUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
