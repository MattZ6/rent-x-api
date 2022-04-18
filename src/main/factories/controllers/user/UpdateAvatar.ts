import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateAvatar';

import { makeUpdateUserAvatarUseCase } from '@main/factories/usecases/user/UpdateAvatar';

export function makeUpdateUserAvatarController() {
  const updateUserAvatarUseCase = makeUpdateUserAvatarUseCase();

  return new UpdateUserAvatarController(updateUserAvatarUseCase);
}
