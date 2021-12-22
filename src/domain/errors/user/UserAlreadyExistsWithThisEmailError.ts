import { DomainError } from '@domain/errors';

export class UserAlreadyExistsWithThisEmailError extends DomainError {
  constructor(message = 'There is already a registered user with this email.') {
    super(message);

    Object.setPrototypeOf(this, UserAlreadyExistsWithThisEmailError.prototype);
  }
}
