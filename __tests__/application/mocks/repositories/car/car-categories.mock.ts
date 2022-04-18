import {
  ICheckIfCarCategoryExistsByIdRepository,
  ICheckIfCarCategoryExistsByNameRepository,
  ICreateCarCategoryRepository,
  IFindAllCarCategoriesRepository,
  IFindCarCategoryByIdRepository,
  IUpdateCarCategoryRepository,
} from '@application/protocols/repositories/car-category';

import { carCategoryMock } from '../../../../domain/entities';

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

    const category = { ...carCategoryMock };

    Object.assign(category, { name, description });

    return category;
  }
}

export class FindCarCategoryByIdRepositorySpy
  implements IFindCarCategoryByIdRepository
{
  async findById(
    data: IFindCarCategoryByIdRepository.Input
  ): Promise<IFindCarCategoryByIdRepository.Output> {
    const { id } = data;

    const category = { ...carCategoryMock };

    Object.assign(category, { id });

    return category;
  }
}

export class UpdateCarCategoryRepositorySpy
  implements IUpdateCarCategoryRepository
{
  async update(
    data: IUpdateCarCategoryRepository.Input
  ): Promise<IUpdateCarCategoryRepository.Output> {
    return data;
  }
}

export class FindAllCarCategoriesRepositorySpy
  implements IFindAllCarCategoriesRepository
{
  async findAll(
    _: IFindAllCarCategoriesRepository.Input
  ): Promise<IFindAllCarCategoriesRepository.Output> {
    return [carCategoryMock, carCategoryMock, carCategoryMock];
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
