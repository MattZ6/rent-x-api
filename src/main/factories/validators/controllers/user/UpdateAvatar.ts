import type { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateAvatar';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateUserAvatarControllerValidation(): ValidationComposite {
  type Input = UpdateUserAvatarController.Request;

  return new ValidationComposite<Input>([new RequiredFieldValidation('file')]);
}
