import { CarCategoryAlreadyExistsWithProvidedNameError } from '@domain/errors';
import { ICreateCarCategoryUseCase } from '@domain/usecases/car/category/Create';

import {
  ICheckIfCarCategoryExistsByNameRepository,
  ICreateCarCategoryRepository,
} from '@application/protocols/repositories/car';

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
      await this.checkIfCarCategoryExistsByNameRepository.checkIfExistsByName({
        name,
      });

    if (alreadyExists) {
      throw new CarCategoryAlreadyExistsWithProvidedNameError();
    }

    const carCategory = await this.createCarCategoryRepository.create({
      name,
      description,
    });

    return carCategory;
  }
}
