import { UpdateCarBrandController } from '@presentation/controllers/car/brand/Update';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateCarBrandControllerValidation(): ValidationComposite {
  type Input = UpdateCarBrandController.RequestBody &
    UpdateCarBrandController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    new UuidFieldValidation('id'),
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
  ]);
}
