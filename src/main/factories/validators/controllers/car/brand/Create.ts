import { CreateCarBrandController } from '@presentation/controllers/car/brand/Create';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeCreateCarBrandControllerValidation(): ValidationComposite {
  type Input = CreateCarBrandController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
  ]);
}
