import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotPasswordMail';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeSendForgotUserPasswordMailUseCase } from '@main/factories/usecases/user/SendForgotPasswordMail';
import { makeSendForgotUserPasswordMailControllerValidation } from '@main/factories/validators/controllers/user/SendForgotPasswordMail';

export function makeSendForgotUserPasswordMailController(): IController {
  const validation = makeSendForgotUserPasswordMailControllerValidation();
  const sendForgotUserPasswordMailUseCase =
    makeSendForgotUserPasswordMailUseCase();

  const controller = new SendForgotUserPasswordMailController(
    validation,
    sendForgotUserPasswordMailUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
