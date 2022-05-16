import { RemoveUserAvatarUseCase } from '@application/usecases/user/RemoveAvatar';

import { storageConfig } from '@main/config/environment/storage';
import { makeDiskStorageProvider } from '@main/factories/providers/DiskStorageProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';
import { makeUserAvatarsRepository } from '@main/factories/repositories/UserAvatar';

export function makeRemoveUserAvatarUseCase() {
  const usersRepository = makeUsersRepository();
  const userAvatarsRepository = makeUserAvatarsRepository();
  const diskStorageProvider = makeDiskStorageProvider();

  return new RemoveUserAvatarUseCase(
    usersRepository,
    userAvatarsRepository,
    diskStorageProvider,
    storageConfig.AVATAR_FOLDER_PATH,
    userAvatarsRepository
  );
}
