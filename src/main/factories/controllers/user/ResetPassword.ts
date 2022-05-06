import { ResetUserPasswordController } from '@presentation/controllers/user/ResetPassword';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeResetUserPasswordUseCase } from '@main/factories/usecases/user/ResetPassword';
import { makeResetUserPasswordControllerValidation } from '@main/factories/validators/controllers/user/ResetPassword';

export function makeResetUserPasswordController(): IController {
  const validation = makeResetUserPasswordControllerValidation();
  const resetUserPasswordUseCase = makeResetUserPasswordUseCase();

  const controller = new ResetUserPasswordController(
    validation,
    resetUserPasswordUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
