import { ICreateCarCategoryUseCase } from '@domain/usecases/car/category/CreateCarCategory';

import { carCategoryMock } from '../../../../../domain/models/car-category.mock';

export class CreateCarCategoryUseCaseSpy implements ICreateCarCategoryUseCase {
  async execute(
    _: ICreateCarCategoryUseCase.Input
  ): Promise<ICreateCarCategoryUseCase.Output> {
    return carCategoryMock;
  }
}