import { RemoveSpecificationFromCarController } from '@presentation/controllers/car/specification/RemoveFromCar';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '@main/factories/validators/validators/UuidField';

export function makeRemoveSpecificationFromCarControllerValidation(): ValidationComposite {
  type Input = RemoveSpecificationFromCarController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
    new RequiredFieldValidation('specification_id'),
    makeUuidFieldValidation('specification_id'),
  ]);
}
