import { DiskStorageProvider } from '@infra/providers/storage/LocalStorageProvider';

import { storageConfig } from '@main/config/environment/storage';

export function makeDiskStorageProvider() {
  return new DiskStorageProvider(storageConfig.DISK_STORAGE_ROOT_FOLDER);
}
