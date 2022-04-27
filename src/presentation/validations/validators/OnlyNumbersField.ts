import { OnlyNumbersFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class OnlyNumbersFieldValidation<I = unknown> implements IValidation<I> {
  constructor(
    private readonly fieldName: keyof I,
    private readonly mustConsiderDot = false
  ) {}

  validate(input: I) {
    const value = String(input[this.fieldName] ?? '').trim();

    if (!value.length) {
      return null;
    }

    const onlyNumbersRegex = this.mustConsiderDot
      ? /^[+-]?([0-9]*[.])?[0-9]+$/
      : /^[0-9]+$/;

    if (!onlyNumbersRegex.test(value)) {
      return new OnlyNumbersFieldError(String(this.fieldName));
    }

    return null;
  }
}
