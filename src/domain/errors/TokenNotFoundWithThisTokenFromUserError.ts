import { AppError } from '.';

export class TokenNotFoundWithThisTokenFromUserError extends AppError {
  constructor(message = 'Token not found.') {
    super(message);
  }
}

TokenNotFoundWithThisTokenFromUserError.prototype = Error.prototype;
