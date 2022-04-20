import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

import { IFindAllCarBrandsRepository } from '@application/protocols/repositories/car/brand';

export class ListAllCarBrandsUseCase implements IListAllCarBrandsUseCase {
  constructor(
    private readonly defaultSortBy: IListAllCarBrandsUseCase.SortBy,
    private readonly defaultOrderBy: IListAllCarBrandsUseCase.OrderBy,
    private readonly defaultLimit: IListAllCarBrandsUseCase.Limit,
    private readonly defaultOffset: IListAllCarBrandsUseCase.Offset,
    private readonly findAllCarBrandsRepository: IFindAllCarBrandsRepository
  ) {}

  async execute(
    data: IListAllCarBrandsUseCase.Input
  ): Promise<IListAllCarBrandsUseCase.Output> {
    const sortBy = data.sort_by ?? this.defaultSortBy;
    const orderBy = data.order_by ?? this.defaultOrderBy;
    const limit = data.limit ?? this.defaultLimit;
    const offset = data.offset ?? this.defaultOffset;

    const carBrands = await this.findAllCarBrandsRepository.findAll({
      sort_by: sortBy as IFindAllCarBrandsRepository.SortBy,
      order_by: orderBy as IFindAllCarBrandsRepository.OrderBy,
      take: limit as IFindAllCarBrandsRepository.Take,
      skip: offset as IFindAllCarBrandsRepository.Skip,
    });

    return carBrands;
  }
}
