import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

import { carCategoryMock } from '../../../../../domain/models';

export class UpdateCarCategoryUseCaseSpy implements IUpdateCarCategoryUseCase {
  async execute(
    _: IUpdateCarCategoryUseCase.Input
  ): Promise<IUpdateCarCategoryUseCase.Output> {
    return carCategoryMock;
  }
}
