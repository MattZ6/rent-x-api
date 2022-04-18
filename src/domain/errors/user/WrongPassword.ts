import { DomainError } from '@domain/errors';

export class WrongPasswordError extends DomainError {
  constructor(message = 'Incorrect password.', code = 'password.wrong') {
    super(message, code);
  }
}
