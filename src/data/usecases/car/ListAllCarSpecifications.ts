import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/ListAllCarSpecifications';

import { IFindAllCarSpecificationsRepository } from '@data/protocols/repositories/car-specification';

export class ListAllCarSpecificationsUseCase
  implements IListAllCarSpecificationsUseCase
{
  constructor(
    private readonly defaultLimit: number,
    private readonly defaultPage: number,
    private readonly findAllCarSpecificationsRepository: IFindAllCarSpecificationsRepository
  ) {}

  async execute(
    data?: IListAllCarSpecificationsUseCase.Input
  ): Promise<IListAllCarSpecificationsUseCase.Output> {
    const { limit = this.defaultLimit, page = this.defaultPage } = data ?? {};

    return this.findAllCarSpecificationsRepository.findAll({
      take: limit,
      skip: page * limit,
    });
  }
}
