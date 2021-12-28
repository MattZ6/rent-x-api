import { AuthenticateUserController } from '@presentation/controllers/user/AuthenticateUser';
import { IController } from '@presentation/protocols';

import { makeAuthenticateUserUseCase } from '@main/factories/usecases/user/AuthenticateUserUseCaseFactory';

export function makeAuthenticateUserController(): IController {
  const authenticateUserUseCase = makeAuthenticateUserUseCase();

  return new AuthenticateUserController(authenticateUserUseCase);
}
