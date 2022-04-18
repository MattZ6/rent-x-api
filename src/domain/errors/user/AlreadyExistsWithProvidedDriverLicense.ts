import { DomainError } from '@domain/errors';

export class UserAlreadyExistsWithProvidedDriverLicenseError extends DomainError {
  constructor(
    message = 'There is already a registered user with this driver license.',
    code = 'user.exists'
  ) {
    super(message, code);
  }
}
