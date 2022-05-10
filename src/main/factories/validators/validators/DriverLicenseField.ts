import { DriverLicenseFieldValidation } from '@presentation/validations/validators';

import { DriverLicenseValidatorAdapter } from '@main/adapters/validators/DriverLicense';

export function makeDriverLicenseFieldValidation<I = unknown>(
  fieldName: keyof I
) {
  return new DriverLicenseFieldValidation<I>(
    new DriverLicenseValidatorAdapter(),
    fieldName
  );
}
