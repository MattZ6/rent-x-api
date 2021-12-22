import { AppError } from '@domain/errors';

export class CarCategoryAlreadyExistsWithThisNameError extends AppError {
  constructor(
    message = 'There is already a registered car category with this name.'
  ) {
    super(message);

    Object.setPrototypeOf(
      this,
      CarCategoryAlreadyExistsWithThisNameError.prototype
    );
  }
}
