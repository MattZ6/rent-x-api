import { AppError } from '.';

export class CarSpecificationNotFoundWithThisIdError extends AppError {
  constructor(message = 'No car specifications found with the id provided.') {
    super(message);
  }
}

CarSpecificationNotFoundWithThisIdError.prototype = Error.prototype;
