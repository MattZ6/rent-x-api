import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { IController } from '@presentation/protocols';

import { makeCreateUserUseCase } from '@main/factories/usecases/user/CreateUserUserUseCaseFactory';

export function makeCreateAccountController(): IController {
  const createUserUseCase = makeCreateUserUseCase();

  return new CreateAccountController(createUserUseCase);
}
