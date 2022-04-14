import { DomainError } from '@domain/errors';

export class CarCategoryNotFoundWithProvidedIdError extends DomainError {
  constructor(
    message = 'No car specifications found with the id provided.',
    code = 'car.category.not.exists'
  ) {
    super(message, code);
  }
}
