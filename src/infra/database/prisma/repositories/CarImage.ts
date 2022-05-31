import { ICreateCarImageRepository } from '@application/protocols/repositories/car';

import { prisma } from '..';

export class PrismaCarImagesRepository implements ICreateCarImageRepository {
  async create(
    data: ICreateCarImageRepository.Input
  ): Promise<ICreateCarImageRepository.Output> {
    const { car_id, original_name, extension, mime_type, size_in_bytes } = data;

    const carImage = await prisma.carImage.create({
      data: {
        car_id,
        original_name,
        mime_type,
        extension,
        size_in_bytes,
      },
    });

    return carImage;
  }
}
