import { ValidationError } from './Validation';

export class DivergentFieldsValuesError extends ValidationError {
  constructor(fieldName: string, fieldToCompareName: string) {
    const message = `The value of the ${fieldName} field is different from the value of the ${fieldToCompareName} field`;

    super(fieldName, 'divergent', message);
    super.message = message;
    super.field = fieldName;
  }
}
