import { DomainError } from '@domain/errors';

export class CarSpecificationNotFoundWithProvidedIdError extends DomainError {
  constructor(
    message = 'No car specifications found with the id provided.',
    code = 'car.specification.not.exists'
  ) {
    super(message, code);
  }
}
