import { MaxValueFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class MaxValueFieldValidation<I = unknown> implements IValidation<I> {
  constructor(
    private readonly fieldName: keyof I,
    private readonly max: number
  ) {}

  validate(input: I) {
    const value = String(input[this.fieldName] ?? '').trim();

    if (!value.length) {
      return null;
    }

    if (Number(value) > this.max) {
      return new MaxValueFieldError(String(this.fieldName), this.max);
    }

    return null;
  }
}
