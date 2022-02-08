import { DomainError } from '@domain/errors';

export class IncorrectPassword extends DomainError {
  constructor(message = 'Incorrect password.') {
    super(message);
  }
}
