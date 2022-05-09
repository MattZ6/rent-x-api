import { UpdateUserEmailController } from '@presentation/controllers/user/UpdateEmail';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeUpdateUserEmailUseCase } from '@main/factories/usecases/user/UpdateEmail';
import { makeUpdateUserEmailControllerValidation } from '@main/factories/validators/controllers/user/UpdateEmail';

export function makeUpdateUserEmailController(): IController {
  const validation = makeUpdateUserEmailControllerValidation();
  const updateUserEmailUseCase = makeUpdateUserEmailUseCase();

  const controller = new UpdateUserEmailController(
    validation,
    updateUserEmailUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
