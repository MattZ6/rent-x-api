import { CarNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetDetails';

import { IFindCarByIdRepository } from '@application/protocols/repositories/car';

export class GetCarDetailsUseCase implements IGetCarDetailsUseCase {
  constructor(private readonly findCarByIdRepository: IFindCarByIdRepository) {}

  async execute(
    data: IGetCarDetailsUseCase.Input
  ): Promise<IGetCarDetailsUseCase.Output> {
    const { id: car_id } = data;

    const car = await this.findCarByIdRepository.findById({
      id: car_id,
      relations: ['brand', 'category', 'specifications'],
    });

    if (!car) {
      throw new CarNotFoundWithProvidedIdError();
    }

    return car;
  }
}
