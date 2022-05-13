import type { UpdateUserPasswordController } from '@presentation/controllers/user/UpdatePassword';
import {
  CompareFieldsValidation,
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateUserPasswordControllerValidation(): ValidationComposite {
  type Input = UpdateUserPasswordController.RequestBody & {
    new_password_confirmation: string;
  };

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('old_password'),
    new MinLengthFieldValidation('old_password', 3, true),
    new RequiredFieldValidation('new_password'),
    new MinLengthFieldValidation('new_password', 3, true),
    new RequiredFieldValidation('new_password_confirmation'),
    new MinLengthFieldValidation('new_password_confirmation', 3, true),
    new CompareFieldsValidation('new_password_confirmation', 'new_password'),
  ]);
}
