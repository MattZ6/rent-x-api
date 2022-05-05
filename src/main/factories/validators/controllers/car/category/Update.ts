import { UpdateCarCategoryController } from '@presentation/controllers/car/category/Update';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateCarCategoryControllerValidation(): ValidationComposite {
  type Input = UpdateCarCategoryController.RequestBody &
    UpdateCarCategoryController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    new UuidFieldValidation('id'),
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('description'),
    new MinLengthFieldValidation('description', 3, true),
  ]);
}
