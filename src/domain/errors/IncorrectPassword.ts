import { AppError } from '.';

export class IncorrectPassword extends AppError {
  constructor(message = 'Incorrect password.') {
    super(message);
    this.name = 'IncorrectPassword';
  }
}
