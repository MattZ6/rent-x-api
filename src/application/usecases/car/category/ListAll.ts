import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

import { IFindAllCarCategoriesRepository } from '@application/protocols/repositories/car/category';

export class ListAllCarCategoriesUseCase
  implements IListAllCarCategoriesUseCase
{
  constructor(
    private readonly defaultSortBy: IListAllCarCategoriesUseCase.SortBy,
    private readonly defaultOrderBy: IListAllCarCategoriesUseCase.OrderBy,
    private readonly defaultLimit: IListAllCarCategoriesUseCase.Limit,
    private readonly defaultOffset: IListAllCarCategoriesUseCase.Offset,
    private readonly findAllCarCategoriesRepository: IFindAllCarCategoriesRepository
  ) {}

  async execute(
    data?: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output> {
    const sortBy = data.sort_by ?? this.defaultSortBy;
    const orderBy = data.order_by ?? this.defaultOrderBy;
    const limit = data.limit ?? this.defaultLimit;
    const offset = data.offset ?? this.defaultOffset;

    const carCategories = await this.findAllCarCategoriesRepository.findAll({
      sort_by: sortBy as IFindAllCarCategoriesRepository.SortBy,
      order_by: orderBy as IFindAllCarCategoriesRepository.OrderBy,
      take: limit as IFindAllCarCategoriesRepository.Take,
      skip: offset as IFindAllCarCategoriesRepository.Skip,
    });

    return carCategories;
  }
}
