import { ICarBrand } from '@domain/models/CarBrand';

import {
  CreateCarBrandDTO,
  ICheckIfCarBrandExistsByNameRepository,
  ICreateCarBrandRepository,
} from '@data/protocols/repositories/car-brand';

import { carBrandMock } from '../../domain/models/car-brand.mock';

export class CheckIfCarBrandExistsByNameRepositorySpy
  implements ICheckIfCarBrandExistsByNameRepository
{
  async checkIfExistsByName(_: string): Promise<boolean> {
    return false;
  }
}

export class CreateCarBrandRepositorySpy implements ICreateCarBrandRepository {
  async create(data: CreateCarBrandDTO): Promise<ICarBrand> {
    const { name } = data;

    const brand = { ...carBrandMock };

    Object.assign(brand, { name });

    return brand;
  }
}
