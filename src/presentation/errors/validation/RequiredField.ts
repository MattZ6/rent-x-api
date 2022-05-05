import { ValidationError } from './Validation';

export class RequiredFieldError extends ValidationError {
  constructor(fieldName: string) {
    const message = `The ${fieldName} field is required`;

    super(fieldName, 'required', message);
    super.message = message;
    super.field = fieldName;
  }
}
