import { AppError } from '.';

export class UserNotFoundWithThisEmailError extends AppError {
  constructor(message = 'No users found with the email provided.') {
    super(message);
  }
}

UserNotFoundWithThisEmailError.prototype = Error.prototype;
