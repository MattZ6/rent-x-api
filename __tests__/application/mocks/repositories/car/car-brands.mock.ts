import {
  ICheckIfCarBrandExistsByIdRepository,
  ICheckIfCarBrandExistsByNameRepository,
  ICreateCarBrandRepository,
  IFindAllCarBrandsRepository,
  IFindCarBrandByIdRepository,
  IUpdateCarBrandRepository,
} from '@application/protocols/repositories/car/brand';

import { makeCarBrandMock } from '../../../../domain';

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

    const carBrandMock = makeCarBrandMock();

    Object.assign(carBrandMock, { name });

    return carBrandMock;
  }
}

export class FindCarBrandByIdRepositorySpy
  implements IFindCarBrandByIdRepository
{
  async findById(
    data: IFindCarBrandByIdRepository.Input
  ): Promise<IFindCarBrandByIdRepository.Output> {
    const { id } = data;

    const carBrandMock = makeCarBrandMock();

    Object.assign(carBrandMock, { id });

    return carBrandMock;
  }
}

export class UpdateCarBrandRepositorySpy implements IUpdateCarBrandRepository {
  async update(
    data: IUpdateCarBrandRepository.Input
  ): Promise<IUpdateCarBrandRepository.Output> {
    const { id, name } = data;

    const carBrandMock = makeCarBrandMock();

    Object.assign(carBrandMock, { id, name });

    return carBrandMock;
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
    return [];
  }
}
