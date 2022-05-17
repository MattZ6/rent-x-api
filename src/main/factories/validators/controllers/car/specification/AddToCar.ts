import { AddSpecificationsToCarController } from '@presentation/controllers/car/specification/AddToCar';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeArrayOfUuidsFieldValidation } from '@main/factories/validators/validators/ArrayOfUuidsField';
import { makeUuidFieldValidation } from '@main/factories/validators/validators/UuidField';

export function makeAddSpecificationsToCarControllerValidation(): ValidationComposite {
  type Input = AddSpecificationsToCarController.RequestBody &
    AddSpecificationsToCarController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
    new RequiredFieldValidation('specifications_ids'),
    makeArrayOfUuidsFieldValidation('specifications_ids'),
  ]);
}
