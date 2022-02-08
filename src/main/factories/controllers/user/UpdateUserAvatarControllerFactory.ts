import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateUserAvatar';

import { makeUpdateUserAvatarUseCase } from '@main/factories/usecases/user/UpdateUserAvatarUseCaseFactory';

export function makeUpdateUserAvatarController() {
  const updateUserAvatarUseCase = makeUpdateUserAvatarUseCase();

  return new UpdateUserAvatarController(updateUserAvatarUseCase);
}
