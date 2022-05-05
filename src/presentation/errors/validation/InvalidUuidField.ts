import { ValidationError } from './Validation';

export class InvalidUuidFieldError extends ValidationError {
  constructor(fieldName: string) {
    const message = `The ${fieldName} is not a valid UUID.`;

    super(fieldName, 'invalid', message);
    super.message = message;
    super.field = fieldName;
  }
}
