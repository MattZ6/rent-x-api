import { ResetUserPasswordController } from '@presentation/controllers/user/ResetPassword';
import { IController } from '@presentation/protocols';

import { makeResetUserPasswordUseCase } from '@main/factories/usecases/user/ResetPassword';

export function makeResetUserPasswordController(): IController {
  const resetUserPasswordUseCase = makeResetUserPasswordUseCase();

  return new ResetUserPasswordController(resetUserPasswordUseCase);
}
