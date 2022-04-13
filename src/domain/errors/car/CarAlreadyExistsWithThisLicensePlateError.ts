import { DomainError } from '@domain/errors';

export class CarAlreadyExistsWithThisLicensePlateError extends DomainError {
  constructor(
    message = 'There is already a registered car with this license plate.',
    code = 'car.exists'
  ) {
    super(message, code);
  }
}
