import { InvalidDriverLicenseFieldError } from '@presentation/errors/validation';
import { IValidation } from '@presentation/protocols';

import { IDriverLicenseValidator } from '../protocols';

export class DriverLicenseFieldValidation<I = unknown>
  implements IValidation<I>
{
  constructor(
    private readonly driverLicenseValidator: IDriverLicenseValidator,
    private readonly fieldName: keyof I
  ) {}

  validate(input: I) {
    if (input[this.fieldName] === undefined || input[this.fieldName] === null) {
      return null;
    }

    const driverLicense = String(input[this.fieldName]).trim();

    const isValid = this.driverLicenseValidator.isValid({
      driver_license: driverLicense,
    });

    if (!isValid) {
      return new InvalidDriverLicenseFieldError(String(this.fieldName));
    }

    return null;
  }
}
