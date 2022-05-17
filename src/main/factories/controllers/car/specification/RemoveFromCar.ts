import { RemoveSpecificationFromCarController } from '@presentation/controllers/car/specification/RemoveFromCar';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeRemoveSpecificationFromCarUseCase } from '@main/factories/usecases/car/specifications/RemoveFromCar';
import { makeRemoveSpecificationFromCarControllerValidation } from '@main/factories/validators/controllers/car/specification/RemoveFromCar';

export function makeRemoveSpecificationFromCarController(): IController {
  const validation = makeRemoveSpecificationFromCarControllerValidation();
  const addSpecificationsToCarUseCase = makeRemoveSpecificationFromCarUseCase();

  const controller = new RemoveSpecificationFromCarController(
    validation,
    addSpecificationsToCarUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
