import { RequiredFieldError } from '@presentation/errors/validation';
import { IValidation } from '@presentation/protocols';

export class RequiredFieldValidation<I = unknown> implements IValidation<I> {
  constructor(private readonly fieldName: keyof I) {}

  validate(input: I) {
    if (!input[this.fieldName]) {
      return new RequiredFieldError(String(this.fieldName));
    }

    return null;
  }
}
