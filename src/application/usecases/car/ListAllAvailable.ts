import { IListAllAvailableCarsUseCase } from '@domain/usecases/car/ListAllAvailable';

import { IFindAllAvailableCarsRepository } from '@application/protocols/repositories/car';

export class ListAllAvailableCarsUseCase
  implements IListAllAvailableCarsUseCase
{
  constructor(
    private readonly defaultSortBy: IListAllAvailableCarsUseCase.SortBy,
    private readonly defaultOrderBy: IListAllAvailableCarsUseCase.OrderBy,
    private readonly defaultLimit: IListAllAvailableCarsUseCase.Limit,
    private readonly defaultOffset: IListAllAvailableCarsUseCase.Offset,
    private readonly findAllAvailableCarsRepository: IFindAllAvailableCarsRepository
  ) {}

  async execute(
    data: IListAllAvailableCarsUseCase.Input
  ): Promise<IListAllAvailableCarsUseCase.Output> {
    const sortBy = data.sort_by ?? this.defaultSortBy;
    const orderBy = data.order_by ?? this.defaultOrderBy;
    const limit = data.limit ?? this.defaultLimit;
    const offset = data.offset ?? this.defaultOffset;

    const cars = await this.findAllAvailableCarsRepository.findAllAvailable({
      sort_by: sortBy as IFindAllAvailableCarsRepository.SortBy,
      order_by: orderBy as IFindAllAvailableCarsRepository.OrderBy,
      take: limit as IFindAllAvailableCarsRepository.Take,
      skip: offset as IFindAllAvailableCarsRepository.Skip,
      brand_id: data.brand_id,
      category_id: data.category_id,
      transmission_type: data.transmission_type,
      type_of_fuel: data.type_of_fuel,
      min_daily_rate: data.min_daily_rate,
      max_daily_rate: data.max_daily_rate,
      start_date: data.start_date,
      end_date: data.end_date,
      search: data.search,
      include: {
        brand: true,
      },
    });

    return cars;
  }
}
