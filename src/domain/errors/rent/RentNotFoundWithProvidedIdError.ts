import { DomainError } from '@domain/errors';

export class RentNotFoundWithProvidedIdError extends DomainError {
  constructor(
    message = 'Rent not found with provided id.',
    code = 'rent.not.exists'
  ) {
    super(message, code);
  }
}
