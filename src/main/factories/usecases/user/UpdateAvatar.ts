import { UpdateUserAvatarUseCase } from '@application/usecases/user/UpdateAvatar';

import { storageConfig } from '@main/config/environment/storage';
import { makeDiskStorageProvider } from '@main/factories/providers/DiskStorageProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';
import { makeUserAvatarsRepository } from '@main/factories/repositories/UserAvatar';

export function makeUpdateUserAvatarUseCase() {
  const usersRepository = makeUsersRepository();
  const userAvatarsRepository = makeUserAvatarsRepository();
  const diskStorageProvider = makeDiskStorageProvider();

  return new UpdateUserAvatarUseCase(
    usersRepository,
    userAvatarsRepository,
    userAvatarsRepository,
    userAvatarsRepository,
    diskStorageProvider,
    storageConfig.AVATAR_FOLDER_PATH
  );
}
