import { GetCarDetailsController } from '@presentation/controllers/car/GetDetails';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '../../validators/UuidField';

export function makeGetCarDetailsControllerValidation(): ValidationComposite {
  type Input = GetCarDetailsController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
  ]);
}
