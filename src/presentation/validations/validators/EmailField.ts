import { InvalidEmailFieldError } from '@presentation/errors/validation';
import { IValidation } from '@presentation/protocols';

export class EmailFieldValidation<I = unknown> implements IValidation<I> {
  private readonly emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private readonly fieldName: keyof I) {}

  validate(input: I): void {
    const email = String(input[this.fieldName] ?? '').trim();

    const isValid = this.emailRegex.test(email);

    if (!isValid) {
      throw new InvalidEmailFieldError(String(this.fieldName));
    }
  }
}
