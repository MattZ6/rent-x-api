import { CarNotFoundWithThisIdError } from '@domain/errors';
import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetCarDetails';

import { IFindCarByIdRepository } from '@data/protocols/repositories/car';

export class GetCarDetailsUseCase implements IGetCarDetailsUseCase {
  constructor(private readonly findCarByIdRepository: IFindCarByIdRepository) {}

  async execute(
    data: IGetCarDetailsUseCase.Input
  ): Promise<IGetCarDetailsUseCase.Output> {
    const { car_id } = data;

    const car = await this.findCarByIdRepository.findById({
      id: car_id,
      relations: ['brand', 'category', 'specifications'],
    });

    if (!car) {
      throw new CarNotFoundWithThisIdError();
    }

    return car;
  }
}
