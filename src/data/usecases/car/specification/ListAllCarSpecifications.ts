import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAllCarSpecifications';

import { IFindAllCarSpecificationsRepository } from '@data/protocols/repositories/car-specification';

export class ListAllCarSpecificationsUseCase
  implements IListAllCarSpecificationsUseCase
{
  constructor(
    private readonly findAllCarSpecificationsRepository: IFindAllCarSpecificationsRepository
  ) {}

  async execute(
    data: IListAllCarSpecificationsUseCase.Input
  ): Promise<IListAllCarSpecificationsUseCase.Output> {
    const { order_by, order, limit, page } = data;

    return this.findAllCarSpecificationsRepository.findAll({
      order_by,
      order,
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
