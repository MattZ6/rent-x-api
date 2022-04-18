import { DomainError } from '@domain/errors';

export class UserTokenExpiredError extends DomainError {
  constructor(message = 'Token has expired.', code = 'user_token.expired') {
    super(message, code);
  }
}
