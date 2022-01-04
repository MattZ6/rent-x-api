import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotUserPasswordMail';
import { IController } from '@presentation/protocols';

import { makeSendForgotUserPasswordMailUseCase } from '@main/factories/usecases/user/SendForgotUserPasswordMailUseCaseFactory';

export function makeSendForgotUserPasswordMailController(): IController {
  const sendForgotUserPasswordMailUseCase =
    makeSendForgotUserPasswordMailUseCase();

  return new SendForgotUserPasswordMailController(
    sendForgotUserPasswordMailUseCase
  );
}
