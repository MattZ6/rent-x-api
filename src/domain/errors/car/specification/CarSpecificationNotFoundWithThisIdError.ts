import { DomainError } from '@domain/errors';

export class CarSpecificationNotFoundWithThisIdError extends DomainError {
  constructor(message = 'No car specifications found with the id provided.') {
    super(message);

    Object.setPrototypeOf(
      this,
      CarSpecificationNotFoundWithThisIdError.prototype
    );
  }
}
