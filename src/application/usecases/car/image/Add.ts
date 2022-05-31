/* eslint-disable no-await-in-loop */
import { CarImage } from '@domain/entities/CarImage';
import { CarNotFoundWithProvidedIdError } from '@domain/errors';
import { IAddImagesToCarUseCase } from '@domain/usecases/car/image/Add';

import { IStoreFileProvider } from '@application/protocols/providers/storage';
import {
  ICheckIfCarExistsByIdRepository,
  ICreateCarImageRepository,
} from '@application/protocols/repositories/car';

export class AddImagesToCarUseCase implements IAddImagesToCarUseCase {
  constructor(
    private readonly checkIfCarExistsByIdRepository: ICheckIfCarExistsByIdRepository,
    private readonly createCarImageRepository: ICreateCarImageRepository,
    private readonly storeFileProvider: IStoreFileProvider,
    private readonly imagesFolderPath: string
  ) {}

  async execute(
    data: IAddImagesToCarUseCase.Input
  ): Promise<IAddImagesToCarUseCase.Output> {
    const { car_id, files } = data;

    const carExists =
      await this.checkIfCarExistsByIdRepository.checkIfExistsById({
        id: car_id,
      });

    if (!carExists) {
      throw new CarNotFoundWithProvidedIdError();
    }

    const carImages: CarImage[] = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];

      const image = await this.createCarImageRepository.create({
        car_id,
        original_name: file.name,
        extension: file.extension,
        mime_type: file.type,
        size_in_bytes: file.size,
      });

      await this.storeFileProvider.store({
        file_name: image.id,
        folder_path: this.imagesFolderPath,
        content: file.content,
      });

      carImages.push(image);
    }

    return carImages;
  }
}
