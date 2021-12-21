import { AppError } from '.';

export class UserAlreadyExistsWithThisEmailError extends AppError {
  constructor(message = 'There is already a registered user with this email.') {
    super(message);
  }
}

UserAlreadyExistsWithThisEmailError.prototype = Error.prototype;
