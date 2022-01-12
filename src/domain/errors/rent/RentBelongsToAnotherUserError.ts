import { DomainError } from '@domain/errors';

export class RentBelongsToAnotherUserError extends DomainError {
  constructor(message = 'The rent belongs to another user.') {
    super(message);
  }
}
