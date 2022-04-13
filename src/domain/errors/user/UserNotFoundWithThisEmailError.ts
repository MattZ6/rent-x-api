import { DomainError } from '@domain/errors';

export class UserNotFoundWithThisEmailError extends DomainError {
  constructor(
    message = 'No users found with the email provided.',
    code = 'user.not.exists'
  ) {
    super(message, code);
  }
}
