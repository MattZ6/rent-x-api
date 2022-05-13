import { InvalidDateFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class DateFieldValidation<I = unknown> implements IValidation<I> {
  constructor(private readonly fieldName: keyof I) {}

  validate(input: I) {
    const date = new Date(String(input[this.fieldName]));

    const isValid = String(date) !== 'Invalid Date' && !Number.isNaN(date);

    if (!isValid) {
      return new InvalidDateFieldError(String(this.fieldName));
    }

    return null;
  }
}
