import {
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
  async checkIfExistsByName(
    _: ICheckIfCarBrandExistsByNameRepository.Input
  ): Promise<ICheckIfCarBrandExistsByNameRepository.Output> {
    return false;
  }
}

export class CreateCarBrandRepositorySpy implements ICreateCarBrandRepository {
  async create(
    data: ICreateCarBrandRepository.Input
  ): Promise<ICreateCarBrandRepository.Output> {
    const { name } = data;

    const brand = { ...carBrandMock };

    Object.assign(brand, { name });

    return brand;
  }
}

export class FindCarBrandByIdRepositorySpy
  implements IFindCarBrandByIdRepository
{
  async findById(
    data: IFindCarBrandByIdRepository.Input
  ): Promise<IFindCarBrandByIdRepository.Output> {
    const { id } = data;

    const brand = { ...carBrandMock };

    Object.assign(brand, { id });

    return brand;
  }
}

export class UpdateCarBrandRepositorySpy implements IUpdateCarBrandRepository {
  async update(
    data: IUpdateCarBrandRepository.Input
  ): Promise<IUpdateCarBrandRepository.Output> {
    return data;
  }
}

export class CheckIfCarBrandExistsByIdRepositorySpy
  implements ICheckIfCarBrandExistsByIdRepository
{
  async checkIfExistsById(
    _: ICheckIfCarBrandExistsByIdRepository.Input
  ): Promise<ICheckIfCarBrandExistsByIdRepository.Output> {
    return true;
  }
}

export class FindAllCarBrandsRepositorySpy
  implements IFindAllCarBrandsRepository
{
  async findAll(
    _: IFindAllCarBrandsRepository.Input
  ): Promise<IFindAllCarBrandsRepository.Output> {
    return [carBrandMock, carBrandMock, carBrandMock];
  }
}
