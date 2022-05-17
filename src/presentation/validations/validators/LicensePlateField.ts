import { InvalidLicensePlateFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

import { ICarLicensePlateValidator } from '../protocols';

export class LicensePlateFieldValidation<I = unknown>
  implements IValidation<I>
{
  constructor(
    private readonly carLicensePlateValidator: ICarLicensePlateValidator,
    private readonly fieldName: keyof I
  ) {}

  validate(input: I) {
    if (input[this.fieldName] === undefined || input[this.fieldName] === null) {
      return null;
    }

    const licensePlate = String(input[this.fieldName]).trim();

    const isValid = this.carLicensePlateValidator.isValid({
      license_plate: licensePlate,
    });

    if (!isValid) {
      return new InvalidLicensePlateFieldError(String(this.fieldName));
    }

    return null;
  }
}
