import { ValidationError } from './Validation';

export class InvalidDateIntervalFieldError extends ValidationError {
  constructor(fieldName: string, fieldNameToCompare: string) {
    const message = `The interval between ${fieldNameToCompare} and ${fieldName} is invalid.`;

    super(fieldName, 'interval', message);
    super.message = message;
    super.field = fieldName;
  }
}
