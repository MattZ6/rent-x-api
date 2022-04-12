import { CarBrandAlreadyExistsWithThisNameError } from '@domain/errors';
import { ICreateCarBrandUseCase } from '@domain/usecases/car/brand/CreateCarBrand';

import {
  ICheckIfCarBrandExistsByNameRepository,
  ICreateCarBrandRepository,
} from '@application/protocols/repositories/car-brand';

export class CreateCarBrandUseCase implements ICreateCarBrandUseCase {
  constructor(
    private readonly checkIfCarBrandExistsByNameRepository: ICheckIfCarBrandExistsByNameRepository,
    private readonly createCarBrandRepository: ICreateCarBrandRepository
  ) {}

  async execute(
    data: ICreateCarBrandUseCase.Input
  ): Promise<ICreateCarBrandUseCase.Output> {
    const { name } = data;

    const exists =
      await this.checkIfCarBrandExistsByNameRepository.checkIfExistsByName({
        name,
      });

    if (exists) {
      throw new CarBrandAlreadyExistsWithThisNameError();
    }

    return this.createCarBrandRepository.create({ name });
  }
}
