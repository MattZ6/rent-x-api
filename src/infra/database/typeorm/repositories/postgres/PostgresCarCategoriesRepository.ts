import { getRepository, Repository } from 'typeorm';

import { CarCategory } from '../../entities/CarCategory';

export class PostgresCarCategoriesRepository {
  private readonly repository: Repository<CarCategory>;

  constructor() {
    this.repository = getRepository(CarCategory);
  }
}
