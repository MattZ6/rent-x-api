import { ValidationError } from './Validation';

export class OnlyNumbersFieldError extends ValidationError {
  constructor(fieldName: string) {
    const message = `The value of ${fieldName} must contain only numbers`;

    super(fieldName, 'number', message);
    super.message = message;
    super.field = fieldName;
  }
}
