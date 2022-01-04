import { DomainError } from '@domain/errors';

export class CarNotFoundWithThisIdError extends DomainError {
  constructor(message = 'No car found with the id provided.') {
    super(message);
  }
}
