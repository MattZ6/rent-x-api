import { AuthenticateUserController } from '@presentation/controllers/user/Authenticate';
import { IController } from '@presentation/protocols';

import { makeAuthenticateUserUseCase } from '@main/factories/usecases/user/Authenticate';

export function makeAuthenticateUserController(): IController {
  const authenticateUserUseCase = makeAuthenticateUserUseCase();

  return new AuthenticateUserController(authenticateUserUseCase);
}
