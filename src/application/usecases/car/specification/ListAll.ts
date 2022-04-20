import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAll';

import { IFindAllCarSpecificationsRepository } from '@application/protocols/repositories/car/specification';

export class ListAllCarSpecificationsUseCase
  implements IListAllCarSpecificationsUseCase
{
  constructor(
    private readonly defaultSortBy: IListAllCarSpecificationsUseCase.SortBy,
    private readonly defaultOrderBy: IListAllCarSpecificationsUseCase.OrderBy,
    private readonly defaultLimit: IListAllCarSpecificationsUseCase.Limit,
    private readonly defaultOffset: IListAllCarSpecificationsUseCase.Offset,
    private readonly findAllCarSpecificationsRepository: IFindAllCarSpecificationsRepository
  ) {}

  async execute(
    data: IListAllCarSpecificationsUseCase.Input
  ): Promise<IListAllCarSpecificationsUseCase.Output> {
    const sortBy = data.sort_by ?? this.defaultSortBy;
    const orderBy = data.order_by ?? this.defaultOrderBy;
    const limit = data.limit ?? this.defaultLimit;
    const offset = data.offset ?? this.defaultOffset;

    const carSpecifications =
      await this.findAllCarSpecificationsRepository.findAll({
        sort_by: sortBy as IFindAllCarSpecificationsRepository.SortBy,
        order_by: orderBy as IFindAllCarSpecificationsRepository.OrderBy,
        take: limit as IFindAllCarSpecificationsRepository.Take,
        skip: offset as IFindAllCarSpecificationsRepository.Skip,
      });

    return carSpecifications;
  }
}
