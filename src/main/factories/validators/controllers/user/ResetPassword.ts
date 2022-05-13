import { ResetUserPasswordController } from '@presentation/controllers/user/ResetPassword';
import {
  CompareFieldsValidation,
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '../../validators/UuidField';

export function makeResetUserPasswordControllerValidation(): ValidationComposite {
  type Input = ResetUserPasswordController.RequestBody & {
    new_password_confirmation: string;
  };

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('token'),
    makeUuidFieldValidation('token'),
    new RequiredFieldValidation('new_password'),
    new MinLengthFieldValidation('new_password', 6),
    new RequiredFieldValidation('new_password_confirmation'),
    new MinLengthFieldValidation('new_password_confirmation', 6),
    new CompareFieldsValidation('new_password_confirmation', 'new_password'),
  ]);
}
