import { DomainError } from '@domain/errors';

export class UserNotFoundWithProvidedIdError extends DomainError {
  constructor(
    message = 'No users found with the id provided.',
    code = 'user.not.exists'
  ) {
    super(message, code);
  }
}
