import { ValidationError } from './Validation';

export class IsNotOneOfValuesFieldError extends ValidationError {
  constructor(fieldName: string, possibleValues: unknown[]) {
    const message = `The value of the ${fieldName} field is not one of ${possibleValues.join(
      ', '
    )} values`;

    super(fieldName, 'invalid', message);
    super.message = message;
    super.field = fieldName;
  }
}
