import { getRepository, Repository } from 'typeorm';

import {
  ICarImagesRepository,
  ICreateCarImageDTO,
} from '@modules/cars/repositories/ICarImagesRepository';

import { CarImage } from '../entities/CarImage';

export class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(data: ICreateCarImageDTO): Promise<CarImage> {
    const { car_id, name, mime_type } = data;

    const carImage = this.repository.create({ car_id, name, mime_type });

    return this.repository.save(carImage);
  }
}
