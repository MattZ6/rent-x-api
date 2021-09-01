import { inject, injectable } from 'tsyringe';

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

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
    private readonly carImagesRepository: ICarImagesRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    const { car_id, images } = data;

    await Promise.all(
      images.map(image =>
        this.carImagesRepository.create({
          car_id,
          name: image.name,
          mime_type: image.mime_type ?? 'image/jpeg',
        })
      )
    );
  }
}
