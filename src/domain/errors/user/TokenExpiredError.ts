import { DomainError } from '@domain/errors';

export class TokenExpiredError extends DomainError {
  constructor(message = 'Token has expired.', code = 'user_token.expired') {
    super(message, code);
  }
}
