import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

import { carCategoryMock } from '../../../../../domain/entities';

export class UpdateCarCategoryUseCaseSpy implements IUpdateCarCategoryUseCase {
  async execute(
    _: IUpdateCarCategoryUseCase.Input
  ): Promise<IUpdateCarCategoryUseCase.Output> {
    return carCategoryMock;
  }
}
