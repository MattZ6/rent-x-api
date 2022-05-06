import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateAvatar';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeUpdateUserAvatarUseCase } from '@main/factories/usecases/user/UpdateAvatar';

export function makeUpdateUserAvatarController() {
  const updateUserAvatarUseCase = makeUpdateUserAvatarUseCase();

  const controller = new UpdateUserAvatarController(updateUserAvatarUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
