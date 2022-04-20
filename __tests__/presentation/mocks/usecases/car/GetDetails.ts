import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetDetails';

import { makeCarMock } from '../../../../domain';

export function makeGetCarDetailsUseCaseOutputMock(): IGetCarDetailsUseCase.Output {
  return makeCarMock();
}

export class GetCarDetailsUseCaseSpy implements IGetCarDetailsUseCase {
  async execute(
    _: IGetCarDetailsUseCase.Input
  ): Promise<IGetCarDetailsUseCase.Output> {
    return makeGetCarDetailsUseCaseOutputMock();
  }
}
