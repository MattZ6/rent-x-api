import { CarNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetDetails';

import { IFindCarByIdRepository } from '@application/protocols/repositories/car';

export class GetCarDetailsUseCase implements IGetCarDetailsUseCase {
  constructor(private readonly findCarByIdRepository: IFindCarByIdRepository) {}

  async execute(
    data: IGetCarDetailsUseCase.Input
  ): Promise<IGetCarDetailsUseCase.Output> {
    const { id } = data;

    const car = await this.findCarByIdRepository.findById({
      id,
      include: {
        brand: true,
        category: true,
        specifications: true,
      },
    });

    if (!car) {
      throw new CarNotFoundWithProvidedIdError();
    }

    return car;
  }
}
