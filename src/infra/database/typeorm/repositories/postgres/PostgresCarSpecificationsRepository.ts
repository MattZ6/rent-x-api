import { getRepository, Raw, Repository } from 'typeorm';

import { ICarSpecification } from '@domain/models/CarSpecification';

import {
  CreateCarSpecificationDTO,
  ICheckIfCarSpecificationExistsByNameRepository,
  ICreateCarSpecificationRepository,
} from '@data/protocols/repositories/car-specification';

import { CarSpecification } from '../../entities/CarSpecification';

export class PostgresCarSpecificationsRepository
  implements
    ICheckIfCarSpecificationExistsByNameRepository,
    ICreateCarSpecificationRepository
{
  private repository: Repository<CarSpecification>;

  constructor() {
    this.repository = getRepository(CarSpecification);
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

  async create(data: CreateCarSpecificationDTO): Promise<ICarSpecification> {
    const { name, description } = data;

    const carSpecification = this.repository.create({ name, description });

    return this.repository.save(carSpecification);
  }
}
