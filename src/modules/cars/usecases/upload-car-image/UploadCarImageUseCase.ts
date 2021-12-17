import { inject, injectable } from 'tsyringe';

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface ICarImageRequest {
  path: string;
  name: string;
  mime_type: string;
}

interface IRequest {
  car_id: string;
  images: ICarImageRequest[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('CarImagesRepository')
    private readonly carImagesRepository: ICarImagesRepository,
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute(data: IRequest): Promise<void> {
    const { car_id, images } = data;

    images.forEach(async image => {
      await this.carImagesRepository.create({
        car_id,
        name: image.name,
        mime_type: image.mime_type ?? 'image/jpeg',
      });

      await this.storageProvider.save({
        file_name: image.name,
        folder_name: 'cars',
      });
    });
  }
}
