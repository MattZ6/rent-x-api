import { UpdateUserPasswordController } from '@presentation/controllers/user/UpdatePassword';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeUpdateUserPasswordUseCase } from '@main/factories/usecases/user/UpdatePassword';
import { makeUpdateUserPasswordControllerValidation } from '@main/factories/validators/controllers/user/UpdatePassword';

export function makeUpdateUserPasswordController(): IController {
  const validation = makeUpdateUserPasswordControllerValidation();
  const updateUserPasswordUseCase = makeUpdateUserPasswordUseCase();

  const controller = new UpdateUserPasswordController(
    validation,
    updateUserPasswordUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
