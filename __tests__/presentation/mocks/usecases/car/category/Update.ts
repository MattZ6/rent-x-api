import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

import { makeCarCategoryMock } from '../../../../../domain';

export function makeUpdateCarCategoryUseCaseOutputMock(): IUpdateCarCategoryUseCase.Output {
  return makeCarCategoryMock();
}

export class UpdateCarCategoryUseCaseSpy implements IUpdateCarCategoryUseCase {
  async execute(
    _: IUpdateCarCategoryUseCase.Input
  ): Promise<IUpdateCarCategoryUseCase.Output> {
    return makeUpdateCarCategoryUseCaseOutputMock();
  }
}
