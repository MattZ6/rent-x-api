import { DomainError } from '@domain/errors';

export class CarAlreadyBookedOnThisDateError extends DomainError {
  constructor(
    message = 'Car already booked on this date.',
    code = 'car.booked'
  ) {
    super(message, code);
  }
}
