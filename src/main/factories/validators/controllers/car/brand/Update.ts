import { UpdateCarBrandController } from '@presentation/controllers/car/brand/Update';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '@main/factories/validators/validators/UuidField';

export function makeUpdateCarBrandControllerValidation(): ValidationComposite {
  type Input = UpdateCarBrandController.RequestBody &
    UpdateCarBrandController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
  ]);
}
