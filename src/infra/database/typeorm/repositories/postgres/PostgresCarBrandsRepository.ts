import { getRepository, Raw, Repository } from 'typeorm';

import { ICarBrand } from '@domain/models/CarBrand';

import {
  CreateCarBrandDTO,
  FindAllCarBrandsDTO,
  ICheckIfCarBrandExistsByNameRepository,
  ICreateCarBrandRepository,
  IFindAllCarBrandsRepository,
  IFindCarBrandByIdRepository,
  IUpdateCarBrandRepository,
} from '@data/protocols/repositories/car-brand';

import { CarBrand } from '../../entities/CarBrand';

export class PostgresCarBrandsRepository
  implements
    ICheckIfCarBrandExistsByNameRepository,
    ICreateCarBrandRepository,
    IFindCarBrandByIdRepository,
    IUpdateCarBrandRepository,
    IFindAllCarBrandsRepository
{
  private readonly repository: Repository<CarBrand>;

  constructor() {
    this.repository = getRepository(CarBrand);
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

  async create(data: CreateCarBrandDTO): Promise<ICarBrand> {
    const { name } = data;

    const carBrand = this.repository.create({ name });

    return this.repository.save(carBrand);
  }

  async findById(id: string): Promise<ICarBrand | undefined> {
    return this.repository.findOne(id);
  }

  async update(data: ICarBrand): Promise<ICarBrand> {
    return this.repository.save(data);
  }

  async findAll(data: FindAllCarBrandsDTO): Promise<ICarBrand[]> {
    const { order_by, order, take, skip } = data;

    return this.repository.find({
      order: { [order_by]: order },
      take,
      skip,
    });
  }
}
