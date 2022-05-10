import { InvalidEmailFieldError } from '@presentation/errors/validation';
import { IValidation } from '@presentation/protocols';

import { IEmailValidator } from '../protocols';

export class EmailFieldValidation<I = unknown> implements IValidation<I> {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly fieldName: keyof I
  ) {}

  validate(input: I) {
    const email = String(input[this.fieldName] ?? '').trim();

    const isValid = this.emailValidator.isValid({ email });

    if (!isValid) {
      return new InvalidEmailFieldError(String(this.fieldName));
    }

    return null;
  }
}
