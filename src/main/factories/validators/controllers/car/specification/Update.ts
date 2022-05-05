import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/Update';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateCarSpecificationControllerValidation(): ValidationComposite {
  type Input = UpdateCarSpecificationController.RequestBody &
    UpdateCarSpecificationController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    new UuidFieldValidation('id'),
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('description'),
    new MinLengthFieldValidation('description', 3, true),
  ]);
}
