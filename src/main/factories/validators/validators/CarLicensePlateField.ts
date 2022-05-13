import { LicensePlateFieldValidation } from '@presentation/validations/validators';

import { CarLicensePlateValidatorAdapter } from '@main/adapters/validators/CarLicensePlate';

export function makeCarLicensePlateFieldValidation<I = unknown>(
  fieldName: keyof I
) {
  return new LicensePlateFieldValidation<I>(
    new CarLicensePlateValidatorAdapter(),
    fieldName
  );
}
