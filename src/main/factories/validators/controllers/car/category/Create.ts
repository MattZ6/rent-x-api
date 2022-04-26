import { CreateCarCategoryController } from '@presentation/controllers/car/category/Create';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeCreateCarCategoryControllerValidation(): ValidationComposite {
  type Input = CreateCarCategoryController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('description'),
    new MinLengthFieldValidation('description', 3, true),
  ]);
}
