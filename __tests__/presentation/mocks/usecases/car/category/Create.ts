import { ICreateCarCategoryUseCase } from '@domain/usecases/car/category/Create';

import { makeCarCategoryMock } from '../../../../../domain';

export function makeCreateCarCategoryUseCaseOutputMock(): ICreateCarCategoryUseCase.Output {
  return makeCarCategoryMock();
}

export class CreateCarCategoryUseCaseSpy implements ICreateCarCategoryUseCase {
  async execute(
    _: ICreateCarCategoryUseCase.Input
  ): Promise<ICreateCarCategoryUseCase.Output> {
    return makeCreateCarCategoryUseCaseOutputMock();
  }
}
