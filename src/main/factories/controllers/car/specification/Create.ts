import { CreateCarSpecificationController } from '@presentation/controllers/car/specification/Create';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeCreateCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/Create';
import { makeCreateCarSpecificationControllerValidation } from '@main/factories/validators/controllers/car/specification/Create';

export function makeCreateCarSpecificationController(): IController {
  const validation = makeCreateCarSpecificationControllerValidation();
  const createCarSpecificationUseCase = makeCreateCarSpecificationUseCase();

  const controller = new CreateCarSpecificationController(
    validation,
    createCarSpecificationUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
