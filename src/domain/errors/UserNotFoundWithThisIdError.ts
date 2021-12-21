import { AppError } from '.';

export class UserNotFoundWithThisIdError extends AppError {
  constructor(message = 'No users found with the id provided.') {
    super(message);
  }
}

UserNotFoundWithThisIdError.prototype = Error.prototype;
