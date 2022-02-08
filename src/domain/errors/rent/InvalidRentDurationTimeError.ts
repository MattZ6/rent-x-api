import { DomainError } from '@domain/errors';

export class InvalidRentDurationTimeError extends DomainError {
  constructor(message = 'Invalid rental duration time.') {
    super(message);
  }
}
