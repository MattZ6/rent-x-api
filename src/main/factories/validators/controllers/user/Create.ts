import type { CreateAccountController } from '@presentation/controllers/user/Create';
import {
  CompareFieldsValidation,
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeDriverLicenseFieldValidation } from '../../validators/DriverLicenseField';
import { makeEmailFieldValidation } from '../../validators/EmailField';

export function makeCreateAccountControllerValidation(): ValidationComposite {
  type Input = CreateAccountController.RequestBody & {
    password_confirmation: string;
  };

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('driver_license'),
    makeDriverLicenseFieldValidation('driver_license'),
    new RequiredFieldValidation('email'),
    makeEmailFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
    new RequiredFieldValidation('password_confirmation'),
    new MinLengthFieldValidation('password_confirmation', 6),
    new CompareFieldsValidation('password_confirmation', 'password'),
  ]);
}
