import { DomainError } from '@domain/errors';

export class CarBrandNotFoundWithThisIdError extends DomainError {
  constructor(message = 'No car brand found with the id provided.') {
    super(message);

    Object.setPrototypeOf(this, CarBrandNotFoundWithThisIdError.prototype);
  }
}
