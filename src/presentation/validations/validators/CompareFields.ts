import { DivergentFieldsValuesError } from '@presentation/errors/validation';
import { IValidation } from '@presentation/protocols';

export class CompareFieldsValidation<I = unknown> implements IValidation<I> {
  constructor(
    private readonly fieldName: keyof I,
    private readonly fieldToCompareName: keyof I
  ) {}

  validate(input: I) {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new DivergentFieldsValuesError(
        String(this.fieldName),
        String(this.fieldToCompareName)
      );
    }

    return null;
  }
}
