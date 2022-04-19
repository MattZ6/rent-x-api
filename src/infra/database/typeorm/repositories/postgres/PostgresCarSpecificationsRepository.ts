import { getRepository, Raw, Repository } from 'typeorm';

import {
  ICheckIfCarSpecificationExistsByIdRepository,
  ICheckIfCarSpecificationExistsByNameRepository,
  ICreateCarSpecificationRepository,
  IDeleteCarSpecificationByIdRepository,
  IFindAllCarSpecificationsRepository,
  IFindAllSpecificationsByIdsRepository,
  IFindCarSpecificationByIdRepository,
  IUpdateCarSpecificationRepository,
} from '@application/protocols/repositories/car/specification';

import { CarSpecification } from '../../entities/CarSpecification';

export class PostgresCarSpecificationsRepository
  implements
    ICheckIfCarSpecificationExistsByNameRepository,
    ICreateCarSpecificationRepository,
    IFindCarSpecificationByIdRepository,
    IUpdateCarSpecificationRepository,
    IFindAllCarSpecificationsRepository,
    ICheckIfCarSpecificationExistsByIdRepository,
    IDeleteCarSpecificationByIdRepository,
    IFindAllSpecificationsByIdsRepository
{
  private repository: Repository<CarSpecification>;

  constructor() {
    this.repository = getRepository(CarSpecification);
  }

  async checkIfExistsByName(
    data: ICheckIfCarSpecificationExistsByNameRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByNameRepository.Output> {
    const { name } = data;

    const count = await this.repository.count({
      where: {
        name: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: name,
        }),
      },
    });

    return count >= 1;
  }

  async create(
    data: ICreateCarSpecificationRepository.Input
  ): Promise<ICreateCarSpecificationRepository.Output> {
    const { name, description } = data;

    const carSpecification = this.repository.create({ name, description });

    return this.repository.save(carSpecification);
  }

  async findById(
    data: IFindCarSpecificationByIdRepository.Input
  ): Promise<IFindCarSpecificationByIdRepository.Output> {
    const { id } = data;

    return this.repository.findOne(id);
  }

  async update(
    data: IUpdateCarSpecificationRepository.Input
  ): Promise<IUpdateCarSpecificationRepository.Output> {
    return this.repository.save(data);
  }

  async findAll(
    data: IFindAllCarSpecificationsRepository.Input
  ): Promise<IFindAllCarSpecificationsRepository.Output> {
    const { sort_by: order_by, order_by: order, take, skip } = data;

    return this.repository.find({
      order: { [order_by]: order },
      take,
      skip,
    });
  }

  async checkIfExistsById(
    data: ICheckIfCarSpecificationExistsByIdRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByIdRepository.Output> {
    const { id } = data;

    const count = await this.repository.count({
      where: { id },
    });

    return count >= 1;
  }

  async deleteById(
    data: IDeleteCarSpecificationByIdRepository.Input
  ): Promise<IDeleteCarSpecificationByIdRepository.Output> {
    const { id } = data;

    await this.repository.delete(id);
  }

  async findAllByIds(
    data: IFindAllSpecificationsByIdsRepository.Input
  ): Promise<IFindAllSpecificationsByIdsRepository.Output> {
    const { ids } = data;

    return this.repository.findByIds(ids);
  }
}
