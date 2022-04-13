import { DomainError } from '@domain/errors';

export class RentBelongsToAnotherUserError extends DomainError {
  constructor(
    message = 'The rent belongs to another user.',
    code = 'rent.from_another_user'
  ) {
    super(message, code);
  }
}
