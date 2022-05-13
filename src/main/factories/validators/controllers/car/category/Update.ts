import { UpdateCarCategoryController } from '@presentation/controllers/car/category/Update';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '@main/factories/validators/validators/UuidField';

export function makeUpdateCarCategoryControllerValidation(): ValidationComposite {
  type Input = UpdateCarCategoryController.RequestBody &
    UpdateCarCategoryController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('description'),
    new MinLengthFieldValidation('description', 3, true),
  ]);
}
