import { ApplicationError } from '@domain/errors';

export class PresentationError extends ApplicationError {
  constructor(message: string, code: string) {
    super(message, code);
  }
}
