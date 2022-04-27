import { ValidationError } from './Validation';

export class InvalidUuidsListFieldError extends ValidationError {
  constructor(fieldName: string) {
    const message = `The ${fieldName} is not a list of valid UUID's.`;

    super(fieldName, 'invalid', message);
    super.message = message;
    super.field = fieldName;
  }
}
