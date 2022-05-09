import type { UpdateUserEmailController } from '@presentation/controllers/user/UpdateEmail';
import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateUserEmailControllerValidation(): ValidationComposite {
  type Input = UpdateUserEmailController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('email'),
    new EmailFieldValidation('email'),
  ]);
}
