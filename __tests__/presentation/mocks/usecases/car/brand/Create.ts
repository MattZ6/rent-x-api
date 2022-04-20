import { ICreateCarBrandUseCase } from '@domain/usecases/car/brand/Create';

import { makeCarBrandMock } from '../../../../../domain';

export function makeCreateCarBrandUseCaseOutputMock(): ICreateCarBrandUseCase.Output {
  return makeCarBrandMock();
}

export class CreateCarBrandUseCaseSpy implements ICreateCarBrandUseCase {
  async execute(
    _: ICreateCarBrandUseCase.Input
  ): Promise<ICreateCarBrandUseCase.Output> {
    return makeCreateCarBrandUseCaseOutputMock();
  }
}
