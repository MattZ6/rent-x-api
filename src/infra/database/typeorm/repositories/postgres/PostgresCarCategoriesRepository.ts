import { getRepository, Raw, Repository } from 'typeorm';

import { ICarCategory } from '@domain/models/CarCategory';

import {
  CreateCarCategoryDTO,
  FindAllCarCategoriesDTO,
  ICheckIfCarCategoryExistsByNameRepository,
  ICreateCarCategoryRepository,
  IFindAllCarCategoriesRepository,
  IFindCarCategoryByIdRepository,
  IUpdateCarCategoryRepository,
} from '@data/protocols/repositories/car-category';

import { CarCategory } from '../../entities/CarCategory';

export class PostgresCarCategoriesRepository
  implements
    ICheckIfCarCategoryExistsByNameRepository,
    ICreateCarCategoryRepository,
    IFindCarCategoryByIdRepository,
    IUpdateCarCategoryRepository,
    IFindAllCarCategoriesRepository
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

  async findById(id: string): Promise<ICarCategory | undefined> {
    return this.repository.findOne(id);
  }

  async update(data: ICarCategory): Promise<ICarCategory> {
    return this.repository.save(data);
  }

  async findAll(data: FindAllCarCategoriesDTO): Promise<ICarCategory[]> {
    const { order_by, order, take, skip } = data;

    return this.repository.find({
      order: { [order_by]: order },
      take,
      skip,
    });
  }
}
