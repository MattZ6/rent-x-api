import { AppError } from './AppError';

export class UserAlreadyExistsWithThisEmailError extends AppError {
  constructor(message = 'There is already a registered user with this email.') {
    super(message);
    this.name = 'UserAlreadyExistsWithThisEmailError';
  }
}
