import { UpdateUserAvatarUseCase } from '@application/usecases/user/UpdateAvatar';

import { storageConfig } from '@main/config/environment/storage';
import { makeDiskStorageProvider } from '@main/factories/providers/DiskStorageProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';
import { makePostgresUserAvatarsRepository } from '@main/factories/repositories/UserAvatar';

export function makeUpdateUserAvatarUseCase() {
  const postgresUsersRepository = makeUsersRepository();
  const postgresUserAvatarsRepository = makePostgresUserAvatarsRepository();
  const diskStorageProvider = makeDiskStorageProvider();

  return new UpdateUserAvatarUseCase(
    postgresUsersRepository,
    postgresUserAvatarsRepository,
    postgresUserAvatarsRepository,
    postgresUserAvatarsRepository,
    diskStorageProvider,
    storageConfig.AVATAR_FOLDER_PATH
  );
}
