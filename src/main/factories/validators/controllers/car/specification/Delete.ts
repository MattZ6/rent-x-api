import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/Delete';
import {
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeDeleteCarSpecificationControllerValidation(): ValidationComposite {
  type Input = DeleteCarSpecificationController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    new UuidFieldValidation('id'),
  ]);
}
