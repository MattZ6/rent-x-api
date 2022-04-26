import { ResetUserPasswordController } from '@presentation/controllers/user/ResetPassword';
import { IController } from '@presentation/protocols';

import { makeResetUserPasswordUseCase } from '@main/factories/usecases/user/ResetPassword';
import { makeResetUserPasswordControllerValidation } from '@main/factories/validators/controllers/user/ResetPassword';

export function makeResetUserPasswordController(): IController {
  const validation = makeResetUserPasswordControllerValidation();
  const resetUserPasswordUseCase = makeResetUserPasswordUseCase();

  return new ResetUserPasswordController(validation, resetUserPasswordUseCase);
}
