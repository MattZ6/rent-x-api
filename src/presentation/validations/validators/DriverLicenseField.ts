import { InvalidDriverLicenseFieldError } from '@presentation/errors/validation';
import { IValidation } from '@presentation/protocols';

export class DriverLicenseFieldValidation<I = unknown>
  implements IValidation<I>
{
  constructor(private readonly fieldName: keyof I) {}

  validate(input: I) {
    const driverLicense = String(input[this.fieldName] ?? '')
      .trim()
      .replace(/[^\d]/g, '');

    const isValid = driverLicense.length === 11;

    if (!isValid) {
      throw new InvalidDriverLicenseFieldError(String(this.fieldName));
    }

    return null;
  }
}
