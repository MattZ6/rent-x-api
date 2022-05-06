import { AuthenticateUserController } from '@presentation/controllers/user/Authenticate';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeAuthenticateUserUseCase } from '@main/factories/usecases/user/Authenticate';
import { makeAuthenticateUserControllerValidation } from '@main/factories/validators/controllers/user/Authenticate';

export function makeAuthenticateUserController(): IController {
  const validation = makeAuthenticateUserControllerValidation();
  const authenticateUserUseCase = makeAuthenticateUserUseCase();

  const controller = new AuthenticateUserController(
    validation,
    authenticateUserUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
