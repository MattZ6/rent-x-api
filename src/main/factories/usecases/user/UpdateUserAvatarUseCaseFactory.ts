import { UpdateUserAvatarUseCase } from '@application/usecases/user/UpdateAvatar';

import { storageConfig } from '@main/config/environment/storage';
import { makeDiskStorageProvider } from '@main/factories/providers/DiskStorageProviderFactory';
import { makePostgresUserAvatarsRepository } from '@main/factories/repositories/PostgresUserAvatarsRepositoryFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export function makeUpdateUserAvatarUseCase() {
  const postgresUsersRepository = makePostgresUsersRepository();
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
