import { AppError } from '.';

export class TokenExpiredError extends AppError {
  constructor(message = 'Token has expired.') {
    super(message);
  }
}

TokenExpiredError.prototype = Error.prototype;
