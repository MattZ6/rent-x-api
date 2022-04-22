import { AuthenticateUserController } from '@presentation/controllers/user/Authenticate';
import { IController } from '@presentation/protocols';

import { makeAuthenticateUserUseCase } from '@main/factories/usecases/user/Authenticate';
import { makeAuthenticateUserControllerValidation } from '@main/factories/validators/controllers/user/Authenticate';

export function makeAuthenticateUserController(): IController {
  const validation = makeAuthenticateUserControllerValidation();
  const authenticateUserUseCase = makeAuthenticateUserUseCase();

  return new AuthenticateUserController(validation, authenticateUserUseCase);
}
