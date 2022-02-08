import { DomainError } from '@domain/errors';

export class UserTokenNotFoundWithThisTokenError extends DomainError {
  constructor(message = 'Token not found.') {
    super(message);
  }
}
