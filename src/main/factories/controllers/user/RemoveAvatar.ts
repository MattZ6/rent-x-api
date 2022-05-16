import { RemoveUserAvatarController } from '@presentation/controllers/user/RemoveAvatar';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeRemoveUserAvatarUseCase } from '@main/factories/usecases/user/RemoveAvatar';

export function makeRemoveUserAvatarController() {
  const removeUserAvatarUseCase = makeRemoveUserAvatarUseCase();

  const controller = new RemoveUserAvatarController(removeUserAvatarUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
