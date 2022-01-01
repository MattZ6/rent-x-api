import { getRepository, Raw, Repository } from 'typeorm';

import { ICar } from '@domain/models/Car';

import {
  CreateCarDTO,
  ICheckIfCarExistsByLicensePlateRepository,
  ICreateCarRepository,
} from '@data/protocols/repositories/car';

import { Car } from '../../entities/Car';

export class PostgresCarsRepository
  implements ICheckIfCarExistsByLicensePlateRepository, ICreateCarRepository
{
  private readonly repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async checkIfExistsByLicensePlate(license_plate: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        license_plate: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: license_plate,
        }),
      },
    });

    return count >= 1;
  }

  async create(data: CreateCarDTO): Promise<ICar> {
    const {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand_id,
      category_id,
      specifications,
    } = data;

    const car = this.repository.create({
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand_id,
      category_id,
      specifications,
    });

    return this.repository.save(car);
  }
}
