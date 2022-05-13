import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/Update';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '@main/factories/validators/validators/UuidField';

export function makeUpdateCarSpecificationControllerValidation(): ValidationComposite {
  type Input = UpdateCarSpecificationController.RequestBody &
    UpdateCarSpecificationController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('description'),
    new MinLengthFieldValidation('description', 3, true),
  ]);
}
