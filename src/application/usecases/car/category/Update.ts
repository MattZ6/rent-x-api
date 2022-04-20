import {
  CarCategoryNotFoundWithProvidedIdError,
  CarCategoryAlreadyExistsWithProvidedNameError,
} from '@domain/errors';
import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

import {
  ICheckIfCarCategoryExistsByNameRepository,
  IFindCarCategoryByIdRepository,
  IUpdateCarCategoryRepository,
} from '@application/protocols/repositories/car';

export class UpdateCarCategoryUseCase implements IUpdateCarCategoryUseCase {
  constructor(
    private readonly findCarCategoryByIdRepository: IFindCarCategoryByIdRepository,
    private readonly checkIfCarCategoryExistsByNameRepository: ICheckIfCarCategoryExistsByNameRepository,
    private readonly updateCarCategoryRepository: IUpdateCarCategoryRepository
  ) {}

  async execute(
    data: IUpdateCarCategoryUseCase.Input
  ): Promise<IUpdateCarCategoryUseCase.Output> {
    const { id, name, description } = data;

    let carCategory = await this.findCarCategoryByIdRepository.findById({ id });

    if (!carCategory) {
      throw new CarCategoryNotFoundWithProvidedIdError();
    }

    const areSameName =
      name.toLowerCase().trim() === carCategory.name.toLowerCase().trim();

    if (!areSameName) {
      const alreadyExists =
        await this.checkIfCarCategoryExistsByNameRepository.checkIfExistsByName(
          { name }
        );

      if (alreadyExists) {
        throw new CarCategoryAlreadyExistsWithProvidedNameError();
      }
    }

    carCategory = await this.updateCarCategoryRepository.update({
      id: carCategory.id,
      name: name.trim(),
      description: description.trim(),
    });

    return carCategory;
  }
}
