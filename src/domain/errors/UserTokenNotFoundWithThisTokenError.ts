import { AppError } from '.';

export class UserTokenNotFoundWithThisTokenError extends AppError {
  constructor(message = 'Token not found.') {
    super(message);
  }
}

UserTokenNotFoundWithThisTokenError.prototype = Error.prototype;
