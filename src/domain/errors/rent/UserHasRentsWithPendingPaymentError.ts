import { DomainError } from '@domain/errors';

export class UserHasOutstandingRentPaymentsError extends DomainError {
  constructor(
    message = 'User has outstanding rent payments.',
    code = 'user.outstanding_payments'
  ) {
    super(message, code);
  }
}
