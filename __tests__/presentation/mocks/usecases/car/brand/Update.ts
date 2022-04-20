import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/Update';

import { makeCarBrandMock } from '../../../../../domain';

export function makeUpdateCarBrandUseCaseOutputMock(): IUpdateCarBrandUseCase.Output {
  return makeCarBrandMock();
}

export class UpdateCarBrandUseCaseSpy implements IUpdateCarBrandUseCase {
  async execute(
    _: IUpdateCarBrandUseCase.Input
  ): Promise<IUpdateCarBrandUseCase.Output> {
    return makeUpdateCarBrandUseCaseOutputMock();
  }
}
