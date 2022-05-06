import { CreateCarController } from '@presentation/controllers/car/Create';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeCreateCarUseCase } from '@main/factories/usecases/car/Create';
import { makeCreateCarControllerValidation } from '@main/factories/validators/controllers/car/Create';

export function makeCreateCarController(): IController {
  const validation = makeCreateCarControllerValidation();
  const createCarUseCase = makeCreateCarUseCase();

  const controller = new CreateCarController(validation, createCarUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
