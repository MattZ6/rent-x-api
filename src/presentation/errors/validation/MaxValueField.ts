import { ValidationError } from './Validation';

export class MaxValueFieldError extends ValidationError {
  constructor(fieldName: string, max: number) {
    const message = `The max value of ${fieldName} field is ${max}`;

    super(fieldName, 'max', message, max);
    super.message = message;
    super.field = fieldName;
    super.value = max;
  }
}
