import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

import { IFindAllCarCategoriesRepository } from '@application/protocols/repositories/car/category';

export class ListAllCarCategoriesUseCase
  implements IListAllCarCategoriesUseCase
{
  constructor(
    private readonly findAllCarCategoriesRepository: IFindAllCarCategoriesRepository
  ) {}

  async execute(
    data?: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output> {
    const { sort_by: order_by, order_by: order, limit, offset: page } = data;

    return this.findAllCarCategoriesRepository.findAll({
      sort_by: order_by,
      order_by: order,
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
