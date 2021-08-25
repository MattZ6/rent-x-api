import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IGetAllAvailableDTO } from '@modules/cars/dtos/IGetAllAvailableDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      is_available,
      category_id,
    } = data;

    const car = this.repository.create({
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      is_available,
      category_id,
    });

    return this.repository.save(car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.repository.findOne({
      where: { license_plate: licensePlate },
    });
  }

  async allAvailable({
    name,
    brand,
    category_id,
  }: IGetAllAvailableDTO): Promise<Car[]> {
    const query = this.repository
      .createQueryBuilder('car')
      .where('car.is_available = :is_available', { is_available: true });

    if (name) {
      query.andWhere('LOWER(car.name) LIKE :name', {
        name: `%${name.trim()}%`,
      });
    }

    if (brand) {
      query.andWhere('LOWER(car.brand) LIKE :brand', {
        brand: `%${brand.trim()}%`,
      });
    }

    if (category_id) {
      query.andWhere('car.category_id = :category_id', {
        category_id,
      });
    }

    return query.getMany();
  }
}
