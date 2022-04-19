import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAll';

import { IFindAllCarSpecificationsRepository } from '@application/protocols/repositories/car-specification';

export class ListAllCarSpecificationsUseCase
  implements IListAllCarSpecificationsUseCase
{
  constructor(
    private readonly findAllCarSpecificationsRepository: IFindAllCarSpecificationsRepository
  ) {}

  async execute(
    data: IListAllCarSpecificationsUseCase.Input
  ): Promise<IListAllCarSpecificationsUseCase.Output> {
    const { sort_by: order_by, order_by: order, limit, offset: page } = data;

    return this.findAllCarSpecificationsRepository.findAll({
      order_by,
      order,
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
