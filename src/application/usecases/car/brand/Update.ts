import {
  CarBrandNotFoundWithProvidedIdError,
  CarBrandAlreadyExistsWithProvidedNameError,
} from '@domain/errors';
import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/Update';

import {
  ICheckIfCarBrandExistsByNameRepository,
  IFindCarBrandByIdRepository,
  IUpdateCarBrandRepository,
} from '@application/protocols/repositories/car/brand';

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

    const brand = await this.findCarBrandByIdRepository.findById({ id });

    if (!brand) {
      throw new CarBrandNotFoundWithProvidedIdError();
    }

    const areSameName =
      name.toLowerCase().trim() === brand.name.toLowerCase().trim();

    if (!areSameName) {
      const alreadyInUse =
        await this.checkIfCarBrandExistsByNameRepository.checkIfExistsByName({
          name,
        });

      if (alreadyInUse) {
        throw new CarBrandAlreadyExistsWithProvidedNameError();
      }
    }

    brand.name = name;

    return this.updateCarBrandRepository.update(brand);
  }
}
