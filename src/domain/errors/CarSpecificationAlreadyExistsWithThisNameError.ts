import { AppError } from '.';

export class CarSpecificationAlreadyExistsWithThisNameError extends AppError {
  constructor(
    message = 'There is already a registered car specification with this name.'
  ) {
    super(message);
  }
}

CarSpecificationAlreadyExistsWithThisNameError.prototype = Error.prototype;
