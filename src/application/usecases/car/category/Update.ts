import {
  CarCategoryNotFoundWithProvidedIdError,
  CarCategoryAlreadyExistsWithProvidedNameError,
} from '@domain/errors';
import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

import {
  ICheckIfCarCategoryExistsByNameRepository,
  IFindCarCategoryByIdRepository,
  IUpdateCarCategoryRepository,
} from '@application/protocols/repositories/car/category';

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

    const category = await this.findCarCategoryByIdRepository.findById({ id });

    if (!category) {
      throw new CarCategoryNotFoundWithProvidedIdError();
    }

    const areSameName =
      name.toLowerCase().trim() === category.name.toLowerCase().trim();

    if (!areSameName) {
      const alreadyInUse =
        await this.checkIfCarCategoryExistsByNameRepository.checkIfExistsByName(
          { name }
        );

      if (alreadyInUse) {
        throw new CarCategoryAlreadyExistsWithProvidedNameError();
      }
    }

    category.name = name;
    category.description = description;

    return this.updateCarCategoryRepository.update(category);
  }
}