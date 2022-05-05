import type { ReturnRentController } from '@presentation/controllers/rent/Return';
import {
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeReturnRentControllerValidation(): ValidationComposite {
  type Input = ReturnRentController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    new UuidFieldValidation('id'),
  ]);
}
