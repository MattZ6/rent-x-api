import { DomainError } from '@domain/errors';

export class TokenExpiredError extends DomainError {
  constructor(message = 'Token has expired.') {
    super(message);

    Object.setPrototypeOf(this, TokenExpiredError.prototype);
  }
}
