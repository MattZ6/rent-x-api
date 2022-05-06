import { UpdateUserNameController } from '@presentation/controllers/user/UpdateName';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeUpdateUserNameUseCase } from '@main/factories/usecases/user/UpdateName';
import { makeUpdateUserNameControllerValidation } from '@main/factories/validators/controllers/user/UpdateName';

export function makeUpdateUserNameController(): IController {
  const validation = makeUpdateUserNameControllerValidation();
  const updateUserNameUseCase = makeUpdateUserNameUseCase();

  const controller = new UpdateUserNameController(
    validation,
    updateUserNameUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
