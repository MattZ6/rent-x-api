import { ValidationError } from '@presentation/errors/validation/Validation';

export interface IValidation<I = unknown> {
  validate(input: I): ValidationError | null;
}
