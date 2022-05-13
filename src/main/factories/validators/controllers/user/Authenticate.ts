import type { AuthenticateUserController } from '@presentation/controllers/user/Authenticate';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeEmailFieldValidation } from '../../validators/EmailField';

export function makeAuthenticateUserControllerValidation(): ValidationComposite {
  type Input = AuthenticateUserController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('email'),
    makeEmailFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
  ]);
}
