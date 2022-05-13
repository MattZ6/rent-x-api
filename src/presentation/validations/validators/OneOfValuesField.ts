import { IsNotOneOfValuesFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class OneOfValuesFieldValidation<I = unknown, O = unknown>
  implements IValidation<I>
{
  constructor(
    private readonly fieldName: keyof I,
    private readonly possibleValues: O[]
  ) {}

  validate(input: I) {
    if (input[this.fieldName] === undefined || input[this.fieldName] === null) {
      return null;
    }

    const isOneOf = !this.possibleValues.some(
      possibleValue =>
        String(input[this.fieldName]).trim().toLocaleLowerCase() ===
        String(possibleValue).trim().toLowerCase()
    );

    if (isOneOf) {
      return new IsNotOneOfValuesFieldError(
        String(this.fieldName),
        this.possibleValues
      );
    }

    return null;
  }
}
