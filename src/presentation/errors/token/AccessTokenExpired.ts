import { PresentationError } from '@presentation/errors';

export class TokenExpiredError extends PresentationError {
  constructor(message = 'The token is expired.', code = 'token.expired') {
    super(message, code);
  }
}
