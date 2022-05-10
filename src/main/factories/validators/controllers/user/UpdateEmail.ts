import type { UpdateUserEmailController } from '@presentation/controllers/user/UpdateEmail';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeEmailFieldValidation } from '../../validators/EmailField';

export function makeUpdateUserEmailControllerValidation(): ValidationComposite {
  type Input = UpdateUserEmailController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('email'),
    makeEmailFieldValidation('email'),
  ]);
}
