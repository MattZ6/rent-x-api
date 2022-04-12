import { PresentationError } from '@presentation/errors';

export class AccessTokenNotProvidedError extends PresentationError {
  constructor(message = 'Missing access token.', code = 'token.not.provided') {
    super(message, code);
  }
}
