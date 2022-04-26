import { CreateCarSpecificationController } from '@presentation/controllers/car/specification/Create';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeCreateCarSpecificationControllerValidation(): ValidationComposite {
  type Input = CreateCarSpecificationController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('description'),
    new MinLengthFieldValidation('description', 3, true),
  ]);
}
