import { DomainError } from '@domain/errors';

export class UserAlreadyExistsWithProvidedEmailError extends DomainError {
  constructor(
    message = 'There is already a registered user with this email.',
    code = 'user.email.in_use'
  ) {
    super(message, code);
  }
}
