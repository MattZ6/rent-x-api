import { DomainError } from '@domain/errors';

export class UserNotFoundWithProvidedEmailError extends DomainError {
  constructor(
    message = 'User not found with provided email.',
    code = 'user.not.exists'
  ) {
    super(message, code);
  }
}
