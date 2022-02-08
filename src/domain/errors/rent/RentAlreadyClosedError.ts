import { DomainError } from '@domain/errors';

export class RentAlreadyClosedError extends DomainError {
  constructor(message = 'The rent is already closed.') {
    super(message);
  }
}
