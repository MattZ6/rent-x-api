import { InvalidLicensePlateFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class LicensePlateFieldValidation<I = unknown>
  implements IValidation<I>
{
  constructor(private readonly fieldName: keyof I) {}

  validate(input: I) {
    const value = String(input[this.fieldName] ?? '').trim();

    if (!value.length) {
      return null;
    }

    const carLicensePlateRegex = /[a-zA-Z]{3}[0-9][0-9a-zA-Z][0-9]{2}/;

    if (!carLicensePlateRegex.test(value)) {
      return new InvalidLicensePlateFieldError(String(this.fieldName));
    }

    return null;
  }
}
