import { DomainError } from '@domain/errors';

export class UserAlreadyExistsWithThisDriverLicenseError extends DomainError {
  constructor(
    message = 'There is already a registered user with this driver license.'
  ) {
    super(message);
  }
}
