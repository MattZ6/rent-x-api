import { getRepository, Raw, Repository } from 'typeorm';

import { ICheckIfCarCategoryExistsByNameRepository } from '@data/protocols/repositories/car-category';

import { CarCategory } from '../../entities/CarCategory';

export class PostgresCarCategoriesRepository
  implements ICheckIfCarCategoryExistsByNameRepository
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
}
