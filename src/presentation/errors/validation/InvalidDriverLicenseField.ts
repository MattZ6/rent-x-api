import { ValidationError } from './Validation';

export class InvalidDriverLicenseFieldError extends ValidationError {
  constructor(fieldName: string) {
    const message = `The ${fieldName} is invalid.`;

    super(fieldName, 'invalid', message);
    super.message = message;
    super.field = fieldName;
  }
}
