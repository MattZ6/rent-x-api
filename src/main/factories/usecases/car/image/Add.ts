import { AddImagesToCarUseCase } from '@application/usecases/car/image/Add';

import { storageConfig } from '@main/config/environment/storage';
import { makeDiskStorageProvider } from '@main/factories/providers/DiskStorageProviderFactory';
import { makeCarsRepository } from '@main/factories/repositories/Car';
import { makeCarImagesRepository } from '@main/factories/repositories/CarImage';

export function makeAddImagesToCarUseCase() {
  const carsRepository = makeCarsRepository();
  const carImagesRepository = makeCarImagesRepository();
  const storageProvider = makeDiskStorageProvider();

  return new AddImagesToCarUseCase(
    carsRepository,
    carImagesRepository,
    storageProvider,
    storageConfig.CAR_IMAGES_FOLDER_PATH
  );
}
