import { ResetUserPasswordController } from '@presentation/controllers/user/ResetUserPassword';
import { IController } from '@presentation/protocols';

import { makeResetUserPasswordUseCase } from '@main/factories/usecases/user/ResetUserPasswordUseCaseFactory';

export function makeResetUserPasswordController(): IController {
  const resetUserPasswordUseCase = makeResetUserPasswordUseCase();

  return new ResetUserPasswordController(resetUserPasswordUseCase);
}
