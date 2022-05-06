import { CreateAccountController } from '@presentation/controllers/user/Create';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeCreateUserUseCase } from '@main/factories/usecases/user/Create';
import { makeCreateAccountControllerValidation } from '@main/factories/validators/controllers/user/Create';

export function makeCreateAccountController(): IController {
  const validation = makeCreateAccountControllerValidation();
  const createUserUseCase = makeCreateUserUseCase();

  const controller = new CreateAccountController(validation, createUserUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
