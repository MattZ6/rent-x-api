import { CarImage } from '@domain/entities/CarImage';

interface ICreateCarImageRepository {
  create(
    data: ICreateCarImageRepository.Input
  ): Promise<ICreateCarImageRepository.Output>;
}

namespace ICreateCarImageRepository {
  export type Input = Pick<
    CarImage,
    'car_id' | 'original_name' | 'extension' | 'mime_type' | 'size_in_bytes'
  >;

  export type Output = CarImage;
}

export { ICreateCarImageRepository };
