import { DomainError } from '@domain/errors';

export class UserHasOutstandingRentPaymentsError extends DomainError {
  constructor(message = 'User has outstanding rent payments.') {
    super(message);
  }
}
