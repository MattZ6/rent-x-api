import { ICreateCarUseCase } from '@domain/usecases/car/Create';

import { makeCarMock } from '../../../../domain';

export function makeCreateCarUseCaseOutputMock(): ICreateCarUseCase.Output {
  return makeCarMock();
}

export class CreateCarUseCaseSpy implements ICreateCarUseCase {
  async execute(_: ICreateCarUseCase.Input): Promise<ICreateCarUseCase.Output> {
    return makeCreateCarUseCaseOutputMock();
  }
}
