import { DomainError } from '@domain/errors';

export class CarBrandNotFoundWithProvidedIdError extends DomainError {
  constructor(
    message = 'No car brand found with the id provided.',
    code = 'car.brand.not.exists'
  ) {
    super(message, code);
  }
}
