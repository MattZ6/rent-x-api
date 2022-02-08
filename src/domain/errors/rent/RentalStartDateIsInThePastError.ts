import { DomainError } from '@domain/errors';

export class RentalStartDateIsInThePastError extends DomainError {
  constructor(message = 'The rental start date cannot be in the past.') {
    super(message);
  }
}
