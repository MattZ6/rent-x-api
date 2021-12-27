import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAllCarCategories';

import { IFindAllCarCategoriesRepository } from '@data/protocols/repositories/car-category';

export class ListAllCarCategoriesUseCase
  implements IListAllCarCategoriesUseCase
{
  constructor(
    private readonly findAllCarCategoriesRepository: IFindAllCarCategoriesRepository
  ) {}

  async execute(
    data?: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output> {
    const { order_by, order, limit, page } = data;

    return this.findAllCarCategoriesRepository.findAll({
      order_by,
      order,
      take: limit,
      skip: page * limit,
    });
  }
}
