import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAllCarCategories';

import { IFindAllCarCategoriesRepository } from '@data/protocols/repositories/car-category';

export class ListAllCarCategoriesUseCase
  implements IListAllCarCategoriesUseCase
{
  constructor(
    private readonly defaultLimit: number,
    private readonly defaultPage: number,
    private readonly findAllCarCategoriesRepository: IFindAllCarCategoriesRepository
  ) {}

  async execute(
    data?: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output> {
    const { limit = this.defaultLimit, page = this.defaultPage } = data ?? {};

    return this.findAllCarCategoriesRepository.findAll({
      take: limit,
      skip: page * limit,
    });
  }
}
