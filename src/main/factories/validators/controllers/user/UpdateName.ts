import type { UpdateUserNameController } from '@presentation/controllers/user/UpdateName';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateUserNameControllerValidation(): ValidationComposite {
  type Input = UpdateUserNameController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
  ]);
}
