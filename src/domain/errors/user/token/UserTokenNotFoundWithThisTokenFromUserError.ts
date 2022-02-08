import { DomainError } from '@domain/errors';

export class TokenNotFoundWithThisTokenFromUserError extends DomainError {
  constructor(message = 'Token not found.') {
    super(message);
  }
}
