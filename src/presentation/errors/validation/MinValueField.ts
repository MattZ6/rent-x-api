import { ValidationError } from './Validation';

export class MinValueFieldError extends ValidationError {
  constructor(fieldName: string, min: number) {
    const message = `The min value of ${fieldName} field is ${min}`;

    super(fieldName, 'min', message, min);
    super.message = message;
    super.field = fieldName;
    super.value = min;
  }
}
