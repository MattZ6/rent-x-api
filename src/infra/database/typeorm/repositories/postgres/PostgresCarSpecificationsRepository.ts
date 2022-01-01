import { getRepository, Raw, Repository } from 'typeorm';

import { ICarSpecification } from '@domain/models/CarSpecification';

import {
  CreateCarSpecificationDTO,
  FindAllCarSpecificationsDTO,
  ICheckIfCarSpecificationExistsByIdRepository,
  ICheckIfCarSpecificationExistsByNameRepository,
  ICreateCarSpecificationRepository,
  IFindAllCarSpecificationsRepository,
  IFindCarSpecificationByIdRepository,
  IUpdateCarSpecificationRepository,
} from '@data/protocols/repositories/car-specification';

import { CarSpecification } from '../../entities/CarSpecification';

export class PostgresCarSpecificationsRepository
  implements
    ICheckIfCarSpecificationExistsByNameRepository,
    ICreateCarSpecificationRepository,
    IFindCarSpecificationByIdRepository,
    IUpdateCarSpecificationRepository,
    IFindAllCarSpecificationsRepository,
    ICheckIfCarSpecificationExistsByIdRepository
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

  async findById(id: string): Promise<ICarSpecification | undefined> {
    return this.repository.findOne(id);
  }

  async update(data: ICarSpecification): Promise<ICarSpecification> {
    return this.repository.save(data);
  }

  async findAll(
    data: FindAllCarSpecificationsDTO
  ): Promise<ICarSpecification[]> {
    const { order_by, order, take, skip } = data;

    return this.repository.find({
      order: { [order_by]: order },
      take,
      skip,
    });
  }

  async checkIfExistsById(id: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { id },
    });

    return count >= 1;
  }
}
