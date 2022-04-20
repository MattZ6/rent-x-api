import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

import { IFindAllCarsRepository } from '@application/protocols/repositories/car';

export class ListAllCarsUseCase implements IListAllCarsUseCase {
  constructor(
    private readonly defaultSortBy: IListAllCarsUseCase.SortBy,
    private readonly defaultOrderBy: IListAllCarsUseCase.OrderBy,
    private readonly defaultLimit: IListAllCarsUseCase.Limit,
    private readonly defaultOffset: IListAllCarsUseCase.Offset,
    private readonly findAllCarsRepository: IFindAllCarsRepository
  ) {}

  async execute(
    data: IListAllCarsUseCase.Input
  ): Promise<IListAllCarsUseCase.Output> {
    const sortBy = data.sort_by ?? this.defaultSortBy;
    const orderBy = data.order_by ?? this.defaultOrderBy;
    const limit = data.limit ?? this.defaultLimit;
    const offset = data.offset ?? this.defaultOffset;

    const cars = await this.findAllCarsRepository.findAll({
      sort_by: sortBy as IFindAllCarsRepository.SortBy,
      order_by: orderBy as IFindAllCarsRepository.OrderBy,
      take: limit as IFindAllCarsRepository.Take,
      skip: offset as IFindAllCarsRepository.Skip,
      brand_id: data.brand_id,
      category_id: data.category_id,
      include: {
        brand: true,
        category: true,
      },
    });

    return cars;
  }
}
