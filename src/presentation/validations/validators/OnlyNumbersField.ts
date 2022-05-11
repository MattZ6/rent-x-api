import { OnlyNumbersFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class OnlyNumbersFieldValidation<I = unknown> implements IValidation<I> {
  private readonly ONLY_NUMBERS_REGEX = /^[0-9]+$/;
  private readonly ONLY_NUMBERS_WITH_DOT_REGEX = /^[+-]?([0-9]*[.])?[0-9]+$/;

  constructor(
    private readonly fieldName: keyof I,
    private readonly mustConsiderDot = false
  ) {}

  validate(input: I) {
    const value = String(input[this.fieldName]);

    let isValid = this.ONLY_NUMBERS_REGEX.test(value);

    if (this.mustConsiderDot) {
      isValid = this.ONLY_NUMBERS_WITH_DOT_REGEX.test(value);
    }

    if (!isValid) {
      return new OnlyNumbersFieldError(String(this.fieldName));
    }

    return null;
  }
}
