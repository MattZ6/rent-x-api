import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotPasswordMail';
import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeSendForgotUserPasswordMailControllerValidation(): ValidationComposite {
  type Input = SendForgotUserPasswordMailController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('email'),
    new EmailFieldValidation('email'),
  ]);
}
