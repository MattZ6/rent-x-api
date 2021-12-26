import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/UpdateCarCategory';

import { carCategoryMock } from '../../domain/models/car-category.mock';

export class UpdateCarCategoryUseCaseSpy implements IUpdateCarCategoryUseCase {
  async execute(
    _: IUpdateCarCategoryUseCase.Input
  ): Promise<IUpdateCarCategoryUseCase.Output> {
    return carCategoryMock;
  }
}
