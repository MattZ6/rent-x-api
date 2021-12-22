import {
  CarBrandNotFoundWithThisIdError,
  CarBrandAlreadyExistsWithThisNameError,
} from '@domain/errors';
import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/UpdateCarBrand';

import {
  ICheckIfCarBrandExistsByNameRepository,
  IFindCarBrandByIdRepository,
  IUpdateCarBrandRepository,
} from '@data/protocols/repositories/car-brand';

export class UpdateCarBrandUseCase implements IUpdateCarBrandUseCase {
  constructor(
    private readonly findCarBrandByIdRepository: IFindCarBrandByIdRepository,
    private readonly checkIfCarBrandExistsByNameRepository: ICheckIfCarBrandExistsByNameRepository,
    private readonly updateCarBrandRepository: IUpdateCarBrandRepository
  ) {}

  async execute(
    data: IUpdateCarBrandUseCase.Input
  ): Promise<IUpdateCarBrandUseCase.Output> {
    const { id, name } = data;

    const brand = await this.findCarBrandByIdRepository.findById(id);

    if (!brand) {
      throw new CarBrandNotFoundWithThisIdError();
    }

    const areSameName =
      name.toLowerCase().trim() === brand.name.toLowerCase().trim();

    if (!areSameName) {
      const alreadyInUse =
        await this.checkIfCarBrandExistsByNameRepository.checkIfExistsByName(
          name
        );

      if (alreadyInUse) {
        throw new CarBrandAlreadyExistsWithThisNameError();
      }
    }

    brand.name = name;

    return this.updateCarBrandRepository.update(brand);
  }
}
