import { ListAllUserRentalsController } from '@presentation/controllers/rent/user/ListAll';
import {
  MaxValueFieldValidation,
  MinValueFieldValidation,
  OnlyNumbersFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { rentConfig } from '@main/config/environment/rent';

export function makeListAllUserRentalsControllerValidation(): ValidationComposite {
  type Input = ListAllUserRentalsController.RequestQuery;

  return new ValidationComposite<Input>([
    new OnlyNumbersFieldValidation('limit'),
    new MinValueFieldValidation('limit', rentConfig.MIN_LIMIT),
    new MaxValueFieldValidation('limit', rentConfig.MAX_LIMIT),
    new OnlyNumbersFieldValidation('offset'),
    new MinValueFieldValidation('offset', rentConfig.MIN_OFFSET),
  ]);
}
