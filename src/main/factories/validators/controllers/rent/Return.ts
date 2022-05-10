import type { ReturnRentController } from '@presentation/controllers/rent/Return';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '../../validators/UuidField';

export function makeReturnRentControllerValidation(): ValidationComposite {
  type Input = ReturnRentController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
  ]);
}
