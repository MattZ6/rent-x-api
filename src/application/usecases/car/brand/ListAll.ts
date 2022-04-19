import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

import { IFindAllCarBrandsRepository } from '@application/protocols/repositories/car-brand';

export class ListAllCarBrandsUseCase implements IListAllCarBrandsUseCase {
  constructor(
    private readonly findAllCarBrandsRepository: IFindAllCarBrandsRepository
  ) {}

  async execute(
    data?: IListAllCarBrandsUseCase.Input
  ): Promise<IListAllCarBrandsUseCase.Output> {
    const { sort_by: order_by, order_by: order, limit, offset: page } = data;

    const skip = limit * (page - 1);

    return this.findAllCarBrandsRepository.findAll({
      order_by,
      order,
      take: limit,
      skip,
    });
  }
}
