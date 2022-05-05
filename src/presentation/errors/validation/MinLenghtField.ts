import { ValidationError } from './Validation';

export class MinLengthFieldError extends ValidationError {
  constructor(fieldName: string, minLength: number) {
    const message = `The ${fieldName} must have at least ${minLength} characters`;

    super(fieldName, 'minlength', message, minLength);
    super.message = message;
    super.field = fieldName;
    super.value = minLength;
  }
}
