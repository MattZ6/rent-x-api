import { GetCarScheduleController } from '@presentation/controllers/rent/car/GetSchedule';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '@main/factories/validators/validators/UuidField';

export function makeGetCarScheduleControllerValidation(): ValidationComposite {
  type Input = GetCarScheduleController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
  ]);
}
