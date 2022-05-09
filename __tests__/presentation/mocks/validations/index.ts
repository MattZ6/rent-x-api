import { ValidationError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export * from './errors';
export * from './validators';

export class ValidationSpy implements IValidation {
  validate(_: unknown): ValidationError | null {
    return null;
  }
}
