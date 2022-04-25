import { DomainError } from '@domain/errors';

export class UserAlreadyExistsWithProvidedDriverLicenseError extends DomainError {
  constructor(
    message = 'There is already a registered user with this driver license.',
    code = 'user.driver_license.in_use'
  ) {
    super(message, code);
  }
}
