import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotPasswordMail';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeEmailFieldValidation } from '../../validators/EmailField';

export function makeSendForgotUserPasswordMailControllerValidation(): ValidationComposite {
  type Input = SendForgotUserPasswordMailController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('email'),
    makeEmailFieldValidation('email'),
  ]);
}
