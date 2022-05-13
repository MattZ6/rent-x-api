import type { CreateRentController } from '@presentation/controllers/rent/Create';
import {
  DateFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
  ValidDateIntervalFieldValidation,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '../../validators/UuidField';

export function makeCreateRentControllerValidation(): ValidationComposite {
  type Input = CreateRentController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('car_id'),
    makeUuidFieldValidation('car_id'),
    new RequiredFieldValidation('start_date'),
    new DateFieldValidation('start_date'),
    new RequiredFieldValidation('end_date'),
    new DateFieldValidation('end_date'),
    new ValidDateIntervalFieldValidation('end_date', 'start_date'),
  ]);
}
