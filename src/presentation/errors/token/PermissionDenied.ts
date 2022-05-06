import { PresentationError } from '@presentation/errors';

export class PermissionDeniedError extends PresentationError {
  constructor(
    message = "You don't have permission to perform this action.",
    code = 'permission.denied'
  ) {
    super(message, code);
  }
}
