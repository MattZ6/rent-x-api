import { DomainError } from '@domain/errors';

export class RentalIsNotInProgressError extends DomainError {
  constructor(
    message = 'Unable to return a rental that is not in progress.',
    code = 'rent.not.in_progress'
  ) {
    super(message, code);
  }
}
