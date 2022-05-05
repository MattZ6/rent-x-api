import { MinLengthFieldError } from '@presentation/errors/validation';
import { IValidation } from '@presentation/protocols';

export class MinLengthFieldValidation<I = unknown> implements IValidation<I> {
  constructor(
    private readonly fieldName: keyof I,
    private readonly min: number,
    private readonly withTrim: boolean = false
  ) {}

  validate(input: I) {
    let value = String(input[this.fieldName] ?? '');

    if (this.withTrim) {
      value = value.trim();
    }

    if (value.length < this.min) {
      return new MinLengthFieldError(String(this.fieldName), this.min);
    }

    return null;
  }
}
