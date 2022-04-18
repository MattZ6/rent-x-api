import { CreateAccountController } from '@presentation/controllers/user/Create';
import { IController } from '@presentation/protocols';

import { makeCreateUserUseCase } from '@main/factories/usecases/user/Create';

export function makeCreateAccountController(): IController {
  const createUserUseCase = makeCreateUserUseCase();

  return new CreateAccountController(createUserUseCase);
}
