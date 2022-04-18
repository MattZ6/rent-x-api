import { ICreateCarCategoryUseCase } from '@domain/usecases/car/category/Create';

import { carCategoryMock } from '../../../../../domain/entities';

export class CreateCarCategoryUseCaseSpy implements ICreateCarCategoryUseCase {
  async execute(
    _: ICreateCarCategoryUseCase.Input
  ): Promise<ICreateCarCategoryUseCase.Output> {
    return carCategoryMock;
  }
}
