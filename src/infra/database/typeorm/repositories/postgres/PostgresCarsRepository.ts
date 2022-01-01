import { getRepository, Repository } from 'typeorm';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

export class PostgresCarsRepository {
  private readonly repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
}
