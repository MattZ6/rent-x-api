import { DomainError } from '@domain/errors';

export class CarSpecificationAlreadyExistsWithProvidedNameError extends DomainError {
  constructor(
    message = 'There is already a registered car specification with this name.',
    code = 'car.specification.exists'
  ) {
    super(message, code);
  }
}
