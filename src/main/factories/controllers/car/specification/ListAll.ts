import { ListAllCarSpecificationsController } from '@presentation/controllers/car/specification/ListAll';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeListAllCarSpecificationsUseCase } from '@main/factories/usecases/car/specifications/ListAll';
import { makeListAllCarSpecificationsControllerValidation } from '@main/factories/validators/controllers/car/specification/ListAll';

export function makeListAllCarSpecificationsController(): IController {
  const validation = makeListAllCarSpecificationsControllerValidation();
  const listAllCarSpecificationsUseCase = makeListAllCarSpecificationsUseCase();

  const controller = new ListAllCarSpecificationsController(
    validation,
    listAllCarSpecificationsUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
