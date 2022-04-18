import { DomainError } from '@domain/errors';

export class TokenNotFoundWithProvidedTokenFromUserError extends DomainError {
  constructor(message = 'Token not found.', code = 'user_token.not.exists') {
    super(message, code);
  }
}
