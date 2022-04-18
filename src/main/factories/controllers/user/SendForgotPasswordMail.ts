import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotPasswordMail';
import { IController } from '@presentation/protocols';

import { makeSendForgotUserPasswordMailUseCase } from '@main/factories/usecases/user/SendForgotPasswordMail';

export function makeSendForgotUserPasswordMailController(): IController {
  const sendForgotUserPasswordMailUseCase =
    makeSendForgotUserPasswordMailUseCase();

  return new SendForgotUserPasswordMailController(
    sendForgotUserPasswordMailUseCase
  );
}
