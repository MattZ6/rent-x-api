import { AddSpecificationsToCarController } from '@presentation/controllers/car/specification/AddToCar';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeAddSpecificationsToCarUseCase } from '@main/factories/usecases/car/specifications/AddToCar';
import { makeAddSpecificationsToCarControllerValidation } from '@main/factories/validators/controllers/car/specification/AddToCar';

export function makeAddSpecificationsToCarController(): IController {
  const validation = makeAddSpecificationsToCarControllerValidation();
  const addSpecificationsToCarUseCase = makeAddSpecificationsToCarUseCase();

  const controller = new AddSpecificationsToCarController(
    validation,
    addSpecificationsToCarUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
