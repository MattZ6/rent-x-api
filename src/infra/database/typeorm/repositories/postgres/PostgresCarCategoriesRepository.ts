import { getRepository, Raw, Repository } from 'typeorm';

import {
  ICheckIfCarCategoryExistsByIdRepository,
  ICheckIfCarCategoryExistsByNameRepository,
  ICreateCarCategoryRepository,
  IFindAllCarCategoriesRepository,
  IFindCarCategoryByIdRepository,
  IUpdateCarCategoryRepository,
} from '@application/protocols/repositories/car-category';

import { CarCategory } from '../../entities/CarCategory';

export class PostgresCarCategoriesRepository
  implements
    ICheckIfCarCategoryExistsByNameRepository,
    ICreateCarCategoryRepository,
    IFindCarCategoryByIdRepository,
    IUpdateCarCategoryRepository,
    IFindAllCarCategoriesRepository,
    ICheckIfCarCategoryExistsByIdRepository
{
  private readonly repository: Repository<CarCategory>;

  constructor() {
    this.repository = getRepository(CarCategory);
  }

  async checkIfExistsByName(
    data: ICheckIfCarCategoryExistsByNameRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByNameRepository.Output> {
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
    data: ICreateCarCategoryRepository.Input
  ): Promise<ICreateCarCategoryRepository.Output> {
    const { name, description } = data;

    const carCategory = this.repository.create({ name, description });

    return this.repository.save(carCategory);
  }

  async findById(
    data: IFindCarCategoryByIdRepository.Input
  ): Promise<IFindCarCategoryByIdRepository.Output> {
    const { id } = data;

    return this.repository.findOne(id);
  }

  async update(
    data: IUpdateCarCategoryRepository.Input
  ): Promise<IUpdateCarCategoryRepository.Output> {
    return this.repository.save(data);
  }

  async findAll(
    data: IFindAllCarCategoriesRepository.Input
  ): Promise<IFindAllCarCategoriesRepository.Output> {
    const { order_by, order, take, skip } = data;

    return this.repository.find({
      order: { [order_by]: order },
      take,
      skip,
    });
  }

  async checkIfExistsById(
    data: ICheckIfCarCategoryExistsByIdRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByIdRepository.Output> {
    const { id } = data;

    const count = await this.repository.count({
      where: { id },
    });

    return count >= 1;
  }
}
