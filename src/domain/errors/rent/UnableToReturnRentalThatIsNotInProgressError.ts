import { DomainError } from '@domain/errors';

export class UnableToReturnRentalThatIsNotInProgressError extends DomainError {
  constructor(message = 'Unable to return a rental that is not in progress.') {
    super(message);
  }
}
