import { DomainError } from '@domain/errors';

export class NotFoundWithProvidedIdFromCar extends DomainError {
  constructor(
    message = 'This specification is not related to this car.',
    code = 'car_specification.not.exists'
  ) {
    super(message, code);
  }
}
