import { container } from 'tsyringe';

import { DiskStorageProvider } from './implementations/DiskStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

type StorageOptionsEnum = 'local' | 's3';

type StorageOptions = {
  [key in StorageOptionsEnum]: any;
};

const storagesOption: StorageOptions = {
  local: DiskStorageProvider,
  s3: S3StorageProvider,
};

const storageOption = (process.env.STORAGE as StorageOptionsEnum) || 'local';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storagesOption[storageOption]
);
