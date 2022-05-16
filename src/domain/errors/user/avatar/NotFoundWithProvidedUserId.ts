import { DomainError } from '@domain/errors';

export class UserAvatarNotFoundWithProvidedUserIdError extends DomainError {
  constructor(
    message = 'This user does not have an avatar.',
    code = 'user_avatar.not.exists'
  ) {
    super(message, code);
  }
}
