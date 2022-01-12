import { DomainError } from '@domain/errors';

export class RentNotFoundWithProvidedIdError extends DomainError {
  constructor(message = 'Rent not found with provided id.') {
    super(message);
  }
}
