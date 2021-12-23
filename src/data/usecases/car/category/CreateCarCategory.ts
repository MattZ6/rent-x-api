import { CarCategoryAlreadyExistsWithThisNameError } from '@domain/errors';
import { ICreateCarCategoryUseCase } from '@domain/usecases/car/category/CreateCarCategory';

import {
  ICheckIfCarCategoryExistsByNameRepository,
  ICreateCarCategoryRepository,
} from '@data/protocols/repositories/car-category';

export class CreateCarCategoryUseCase implements ICreateCarCategoryUseCase {
  constructor(
    private readonly checkIfCarCategoryExistsByNameRepository: ICheckIfCarCategoryExistsByNameRepository,
    private readonly createCarCategoryRepository: ICreateCarCategoryRepository
  ) {}

  async execute(
    data: ICreateCarCategoryUseCase.Input
  ): Promise<ICreateCarCategoryUseCase.Output> {
    const { name, description } = data;

    const alreadyExists =
      await this.checkIfCarCategoryExistsByNameRepository.checkIfExistsByName(
        name
      );

    if (alreadyExists) {
      throw new CarCategoryAlreadyExistsWithThisNameError();
    }

    return this.createCarCategoryRepository.create({ name, description });
  }
}