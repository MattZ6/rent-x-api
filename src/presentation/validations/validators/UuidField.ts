import { InvalidUuidFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

import { IUuidValidator } from '../protocols';

export class UuidFieldValidation<I = unknown> implements IValidation<I> {
  constructor(
    private readonly uuidValidator: IUuidValidator,
    private readonly fieldName: keyof I
  ) {}

  validate(input: I) {
    const uuid = String(input[this.fieldName] ?? '').trim();

    const isValidUuid = this.uuidValidator.isValid({ uuid });

    if (!isValidUuid) {
      return new InvalidUuidFieldError(String(this.fieldName));
    }

    return null;
  }
}
