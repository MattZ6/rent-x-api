import { DomainError } from '@domain/errors';

export class UserNotFoundWithThisEmailError extends DomainError {
  constructor(message = 'No users found with the email provided.') {
    super(message);

    Object.setPrototypeOf(this, UserNotFoundWithThisEmailError.prototype);
  }
}
