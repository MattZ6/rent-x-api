import { InvalidDateIntervalFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class ValidDateIntervalFieldValidation<I = unknown>
  implements IValidation<I>
{
  constructor(
    private readonly fieldName: keyof I,
    private readonly fieldNameToCompare: keyof I
  ) {}

  validate(input: I): void {
    const end = new Date(String(input[this.fieldName] ?? '').trim());
    const start = new Date(String(input[this.fieldNameToCompare] ?? '').trim());

    const isValid = end.getTime() > start.getTime();

    if (!isValid) {
      throw new InvalidDateIntervalFieldError(
        String(this.fieldName),
        String(this.fieldNameToCompare)
      );
    }
  }
}
