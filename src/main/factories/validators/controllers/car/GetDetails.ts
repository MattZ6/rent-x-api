import { GetCarDetailsController } from '@presentation/controllers/car/GetDetails';
import {
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeGetCarDetailsControllerValidation(): ValidationComposite {
  type Input = GetCarDetailsController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    new UuidFieldValidation('id'),
  ]);
}
