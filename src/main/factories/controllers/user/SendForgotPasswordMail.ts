import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotPasswordMail';
import { IController } from '@presentation/protocols';

import { makeSendForgotUserPasswordMailUseCase } from '@main/factories/usecases/user/SendForgotPasswordMail';
import { makeSendForgotUserPasswordMailControllerValidation } from '@main/factories/validators/controllers/user/SendForgotPasswordMail';

export function makeSendForgotUserPasswordMailController(): IController {
  const validation = makeSendForgotUserPasswordMailControllerValidation();
  const sendForgotUserPasswordMailUseCase =
    makeSendForgotUserPasswordMailUseCase();

  return new SendForgotUserPasswordMailController(
    validation,
    sendForgotUserPasswordMailUseCase
  );
}
