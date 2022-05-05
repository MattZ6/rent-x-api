import { InvalidDateFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class DateFieldValidation<I = unknown> implements IValidation<I> {
  constructor(private readonly fieldName: keyof I) {}

  validate(input: I): void {
    const value = String(input[this.fieldName] ?? '').trim();
    const date = new Date(value);

    const isValid = String(date) !== 'Invalid Date' && !Number.isNaN(date);

    if (!isValid) {
      throw new InvalidDateFieldError(String(this.fieldName));
    }
  }
}
