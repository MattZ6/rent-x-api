import { IValidation } from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

export * from './errors';

export class ValidationSpy implements IValidation {
  validate(_: unknown): ValidationError | null {
    return null;
  }
}
