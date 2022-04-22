import { ValidationError } from '@presentation/validations/errors';

export interface IValidation<I = unknown> {
  validate(input: I): ValidationError | null;
}
