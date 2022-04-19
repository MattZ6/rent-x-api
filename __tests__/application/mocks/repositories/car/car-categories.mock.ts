import {
  ICheckIfCarCategoryExistsByIdRepository,
  ICheckIfCarCategoryExistsByNameRepository,
  ICreateCarCategoryRepository,
  IFindAllCarCategoriesRepository,
  IFindCarCategoryByIdRepository,
  IUpdateCarCategoryRepository,
} from '@application/protocols/repositories/car/category';

import { makeCarCategoryMock } from '../../../../domain/entities';

export class CheckIfCarCategoryExistsByNameRepositorySpy
  implements ICheckIfCarCategoryExistsByNameRepository
{
  async checkIfExistsByName(
    _: ICheckIfCarCategoryExistsByNameRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByNameRepository.Output> {
    return false;
  }
}

export class CreateCarCategoryRepositorySpy
  implements ICreateCarCategoryRepository
{
  async create(
    data: ICreateCarCategoryRepository.Input
  ): Promise<ICreateCarCategoryRepository.Output> {
    const { name, description } = data;

    const carCategoryMock = makeCarCategoryMock();

    Object.assign(carCategoryMock, { name, description });

    return carCategoryMock;
  }
}

export class FindCarCategoryByIdRepositorySpy
  implements IFindCarCategoryByIdRepository
{
  async findById(
    data: IFindCarCategoryByIdRepository.Input
  ): Promise<IFindCarCategoryByIdRepository.Output> {
    const { id } = data;

    const carCategoryMock = makeCarCategoryMock();

    Object.assign(carCategoryMock, { id });

    return carCategoryMock;
  }
}

export class UpdateCarCategoryRepositorySpy
  implements IUpdateCarCategoryRepository
{
  async update(
    data: IUpdateCarCategoryRepository.Input
  ): Promise<IUpdateCarCategoryRepository.Output> {
    const { id, description, name } = data;

    const carCategoryMock = makeCarCategoryMock();

    Object.assign(carCategoryMock, { id, description, name });

    return carCategoryMock;
  }
}

export class FindAllCarCategoriesRepositorySpy
  implements IFindAllCarCategoriesRepository
{
  async findAll(
    _: IFindAllCarCategoriesRepository.Input
  ): Promise<IFindAllCarCategoriesRepository.Output> {
    return [];
  }
}

export class CheckIfCarCategoryExistsByIdRepositorySpy
  implements ICheckIfCarCategoryExistsByIdRepository
{
  async checkIfExistsById(
    _: ICheckIfCarCategoryExistsByIdRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByIdRepository.Output> {
    return true;
  }
}
