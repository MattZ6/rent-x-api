import { getRepository, Raw, Repository } from 'typeorm';

import { ICarCategory } from '@domain/models/CarCategory';

import {
  CreateCarCategoryDTO,
  ICheckIfCarCategoryExistsByNameRepository,
  ICreateCarCategoryRepository,
} from '@data/protocols/repositories/car-category';

import { CarCategory } from '../../entities/CarCategory';

export class PostgresCarCategoriesRepository
  implements
    ICheckIfCarCategoryExistsByNameRepository,
    ICreateCarCategoryRepository
{
  private readonly repository: Repository<CarCategory>;

  constructor() {
    this.repository = getRepository(CarCategory);
  }

  async checkIfExistsByName(name: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        name: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: name,
        }),
      },
    });

    return count >= 1;
  }

  async create(data: CreateCarCategoryDTO): Promise<ICarCategory> {
    const { name, description } = data;

    const carCategory = this.repository.create({ name, description });

    return this.repository.save(carCategory);
  }
}
