import { getRepository, Raw, Repository } from 'typeorm';

import {
  ICheckIfCarBrandExistsByIdRepository,
  ICheckIfCarBrandExistsByNameRepository,
  ICreateCarBrandRepository,
  IFindAllCarBrandsRepository,
  IFindCarBrandByIdRepository,
  IUpdateCarBrandRepository,
} from '@application/protocols/repositories/car/brand';

import { CarBrand } from '../../entities/CarBrand';

export class PostgresCarBrandsRepository
  implements
    ICheckIfCarBrandExistsByNameRepository,
    ICreateCarBrandRepository,
    IFindCarBrandByIdRepository,
    IUpdateCarBrandRepository,
    IFindAllCarBrandsRepository,
    ICheckIfCarBrandExistsByIdRepository
{
  private readonly repository: Repository<CarBrand>;

  constructor() {
    this.repository = getRepository(CarBrand);
  }

  async checkIfExistsByName(
    data: ICheckIfCarBrandExistsByNameRepository.Input
  ): Promise<ICheckIfCarBrandExistsByNameRepository.Output> {
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
    data: ICreateCarBrandRepository.Input
  ): Promise<ICreateCarBrandRepository.Output> {
    const { name } = data;

    const carBrand = this.repository.create({ name });

    return this.repository.save(carBrand);
  }

  async findById(
    data: IFindCarBrandByIdRepository.Input
  ): Promise<IFindCarBrandByIdRepository.Output> {
    const { id } = data;

    return this.repository.findOne(id);
  }

  async update(
    data: IUpdateCarBrandRepository.Input
  ): Promise<IUpdateCarBrandRepository.Output> {
    return this.repository.save(data);
  }

  async findAll(
    data: IFindAllCarBrandsRepository.Input
  ): Promise<IFindAllCarBrandsRepository.Output> {
    const { sort_by: order_by, order_by: order, take, skip } = data;

    return this.repository.find({
      order: { [order_by]: order },
      take,
      skip,
    });
  }

  async checkIfExistsById(
    data: ICheckIfCarBrandExistsByIdRepository.Input
  ): Promise<ICheckIfCarBrandExistsByIdRepository.Output> {
    const { id } = data;

    const count = await this.repository.count({
      where: { id },
    });

    return count >= 1;
  }
}
