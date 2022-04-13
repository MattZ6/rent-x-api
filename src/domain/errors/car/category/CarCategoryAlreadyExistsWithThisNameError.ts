import { DomainError } from '@domain/errors';

export class CarCategoryAlreadyExistsWithThisNameError extends DomainError {
  constructor(
    message = 'There is already a registered car category with this name.',
    code = 'car.category.exists'
  ) {
    super(message, code);
  }
}
