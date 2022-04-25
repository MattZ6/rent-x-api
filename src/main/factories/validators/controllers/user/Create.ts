import type { CreateAccountController } from '@presentation/controllers/user/Create';
import {
  CompareFieldsValidation,
  DriverLicenseFieldValidation,
  EmailFieldValidation,
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeCreateAccountControllerValidation(): ValidationComposite {
  type Input = CreateAccountController.RequestBody & {
    password_confirmation: string;
  };

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('driver_license'),
    new DriverLicenseFieldValidation('driver_license'),
    new RequiredFieldValidation('email'),
    new EmailFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
    new RequiredFieldValidation('password_confirmation'),
    new MinLengthFieldValidation('password_confirmation', 6),
    new CompareFieldsValidation('password_confirmation', 'password'),
  ]);
}
