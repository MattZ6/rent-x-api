import { InvalidUuidFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class UuidFieldValidation<I = unknown> implements IValidation<I> {
  constructor(private readonly fieldName: keyof I) {}

  validate(input: I) {
    const value = String(input[this.fieldName] ?? '').trim();

    if (!value.length) {
      return null;
    }

    const uuidRegExp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const isValidUuid = uuidRegExp.test(value);

    if (!isValidUuid) {
      return new InvalidUuidFieldError(String(this.fieldName));
    }

    return null;
  }
}
