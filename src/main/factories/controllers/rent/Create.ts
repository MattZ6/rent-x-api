import { CreateRentController } from '@presentation/controllers/rent/Create';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeCreateRentUseCase } from '@main/factories/usecases/rent/Create';
import { makeCreateRentControllerValidation } from '@main/factories/validators/controllers/rent/Create';

export function makeCreateRentController(): IController {
  const validation = makeCreateRentControllerValidation();
  const createRentUseCase = makeCreateRentUseCase();

  const controller = new CreateRentController(validation, createRentUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
