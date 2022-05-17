import { DomainError } from '@domain/errors';

export class OneOrMoreCarSpecificationsAlreadyRelatedToCarError extends DomainError {
  constructor(
    message = 'One or more specifications are already related to the car.',
    code = 'cars_specification.exists'
  ) {
    super(message, code);
  }
}
