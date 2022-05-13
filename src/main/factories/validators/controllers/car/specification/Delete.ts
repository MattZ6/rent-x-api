import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/Delete';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '@main/factories/validators/validators/UuidField';

export function makeDeleteCarSpecificationControllerValidation(): ValidationComposite {
  type Input = DeleteCarSpecificationController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
  ]);
}
