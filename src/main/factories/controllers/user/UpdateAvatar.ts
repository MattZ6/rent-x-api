import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateAvatar';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeUpdateUserAvatarUseCase } from '@main/factories/usecases/user/UpdateAvatar';
import { makeUpdateUserAvatarControllerValidation } from '@main/factories/validators/controllers/user/UpdateAvatar';

export function makeUpdateUserAvatarController() {
  const validation = makeUpdateUserAvatarControllerValidation();
  const updateUserAvatarUseCase = makeUpdateUserAvatarUseCase();

  const controller = new UpdateUserAvatarController(
    validation,
    updateUserAvatarUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
