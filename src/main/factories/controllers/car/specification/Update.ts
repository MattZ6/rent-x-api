import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/Update';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeUpdateCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/Update';
import { makeUpdateCarSpecificationControllerValidation } from '@main/factories/validators/controllers/car/specification/Update';

export function makeUpdateCarSpecificationController(): IController {
  const validation = makeUpdateCarSpecificationControllerValidation();
  const updateCarSpecificationUseCase = makeUpdateCarSpecificationUseCase();

  const controller = new UpdateCarSpecificationController(
    validation,
    updateCarSpecificationUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
