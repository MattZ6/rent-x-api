import { DomainError } from '@domain/errors';

export class OneOrMoreCarSpecificationsNotFoundWithThisIdsError extends DomainError {
  constructor(
    message = 'One or more car specificationss not found with the provided ids.'
  ) {
    super(message);

    Object.setPrototypeOf(
      this,
      OneOrMoreCarSpecificationsNotFoundWithThisIdsError.prototype
    );
  }
}
