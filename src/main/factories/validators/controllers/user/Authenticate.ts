import type { AuthenticateUserController } from '@presentation/controllers/user/Authenticate';
import {
  EmailFieldValidation,
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeAuthenticateUserControllerValidation(): ValidationComposite {
  type Input = AuthenticateUserController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('email'),
    new EmailFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
  ]);
}
