import { ICarBrand } from '@domain/models/CarBrand';

import {
  CreateCarBrandDTO,
  FindAllCarBrandsDTO,
  ICheckIfCarBrandExistsByIdRepository,
  ICheckIfCarBrandExistsByNameRepository,
  ICreateCarBrandRepository,
  IFindAllCarBrandsRepository,
  IFindCarBrandByIdRepository,
  IUpdateCarBrandRepository,
} from '@data/protocols/repositories/car-brand';

import { carBrandMock } from '../../../domain/models/car-brand.mock';

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

export class FindCarBrandByIdRepositorySpy
  implements IFindCarBrandByIdRepository
{
  async findById(id: string): Promise<ICarBrand | undefined> {
    const brand = { ...carBrandMock };

    Object.assign(brand, { id });

    return brand;
  }
}

export class UpdateCarBrandRepositorySpy implements IUpdateCarBrandRepository {
  async update(data: ICarBrand): Promise<ICarBrand> {
    return data;
  }
}

export class CheckIfCarBrandExistsByIdRepositorySpy
  implements ICheckIfCarBrandExistsByIdRepository
{
  async checkIfExistsById(_: string): Promise<boolean> {
    return true;
  }
}

export class FindAllCarBrandsRepositorySpy
  implements IFindAllCarBrandsRepository
{
  async findAll(_: FindAllCarBrandsDTO): Promise<ICarBrand[]> {
    return [carBrandMock, carBrandMock, carBrandMock];
  }
}
