import type { AddImagesToCarController } from '@presentation/controllers/car/images/Add';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeUuidFieldValidation } from '@main/factories/validators/validators/UuidField';

export function makeAddImagesToCarControllerValidation(): ValidationComposite {
  type Input = AddImagesToCarController.RequestParams &
    Pick<AddImagesToCarController.Request, 'files'>;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('id'),
    makeUuidFieldValidation('id'),
    new RequiredFieldValidation('files'),
  ]);
}
