import { IListAllCarsUseCase } from '@domain/usecases/car/ListAllCars';

import { IFindAllCarsRepository } from '@application/protocols/repositories/car';

export class ListAllCarsUseCase implements IListAllCarsUseCase {
  constructor(private readonly findAllCarsRepository: IFindAllCarsRepository) {}

  async execute(
    data: IListAllCarsUseCase.Input
  ): Promise<IListAllCarsUseCase.Output> {
    const { order_by, order, limit, page } = data;

    let tempPage = page - 1;

    if (tempPage < 0) {
      tempPage = 0;
    }

    return this.findAllCarsRepository.findAll({
      order_by,
      order,
      take: limit,
      skip: tempPage * limit,
      relations: ['brand', 'category'],
    });
  }
}
