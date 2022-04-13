import { DomainError } from '@domain/errors';

export class RentAlreadyClosedError extends DomainError {
  constructor(message = 'The rent is already closed.', code = 'rent.closed') {
    super(message, code);
  }
}
