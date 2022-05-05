import { ValidationError } from './Validation';

export class InvalidLicensePlateFieldError extends ValidationError {
  constructor(fieldName: string) {
    const message = `The ${fieldName} is invalid.`;

    super(fieldName, 'invalid', message);
    super.message = message;
    super.field = fieldName;
  }
}
