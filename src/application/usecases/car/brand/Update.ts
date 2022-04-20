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

    let carBrand = await this.findCarBrandByIdRepository.findById({ id });

    if (!carBrand) {
      throw new CarBrandNotFoundWithProvidedIdError();
    }

    const areSameName =
      name.toLowerCase().trim() === carBrand.name.toLowerCase().trim();

    if (!areSameName) {
      const alreadyExists =
        await this.checkIfCarBrandExistsByNameRepository.checkIfExistsByName({
          name,
        });

      if (alreadyExists) {
        throw new CarBrandAlreadyExistsWithProvidedNameError();
      }

      carBrand = await this.updateCarBrandRepository.update({
        id: carBrand.id,
        name: name.trim(),
      });
    }

    return carBrand;
  }
}
