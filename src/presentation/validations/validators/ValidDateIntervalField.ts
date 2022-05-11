import { InvalidDateIntervalFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class ValidDateIntervalFieldValidation<I = unknown>
  implements IValidation<I>
{
  constructor(
    private readonly fieldName: keyof I,
    private readonly fieldNameToCompare: keyof I
  ) {}

  validate(input: I) {
    const end = new Date(String(input[this.fieldName]));
    const start = new Date(String(input[this.fieldNameToCompare]));

    const isValid = end.getTime() > start.getTime();

    if (!isValid) {
      return new InvalidDateIntervalFieldError(
        String(this.fieldName),
        String(this.fieldNameToCompare)
      );
    }

    return null;
  }
}
