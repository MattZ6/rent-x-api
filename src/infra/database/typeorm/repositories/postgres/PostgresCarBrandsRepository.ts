import { getRepository, Raw, Repository } from 'typeorm';

import { ICarBrand } from '@domain/models/CarBrand';

import {
  CreateCarBrandDTO,
  ICheckIfCarBrandExistsByNameRepository,
  ICreateCarBrandRepository,
  IFindCarBrandByIdRepository,
} from '@data/protocols/repositories/car-brand';

import { CarBrand } from '../../entities/CarBrand';

export class PostgresCarBrandsRepository
  implements
    ICheckIfCarBrandExistsByNameRepository,
    ICreateCarBrandRepository,
    IFindCarBrandByIdRepository
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
}
