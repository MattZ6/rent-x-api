import { CreateAccountController } from '@presentation/controllers/user/Create';
import { IController } from '@presentation/protocols';

import { makeCreateUserUseCase } from '@main/factories/usecases/user/Create';
import { makeCreateAccountControllerValidation } from '@main/factories/validators/controllers/user/Create';

export function makeCreateAccountController(): IController {
  const validation = makeCreateAccountControllerValidation();
  const createUserUseCase = makeCreateUserUseCase();

  return new CreateAccountController(validation, createUserUseCase);
}
