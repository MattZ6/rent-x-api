import { IReturnRentUseCase } from '@domain/usecases/rent/Return';

import { makeRentMock } from '../../../../domain';

export function makeReturnRentUseCaseOutputMock(): IReturnRentUseCase.Output {
  return makeRentMock();
}

export class ReturnRentUseCaseSpy implements IReturnRentUseCase {
  async execute(
    _: IReturnRentUseCase.Input
  ): Promise<IReturnRentUseCase.Output> {
    return makeReturnRentUseCaseOutputMock();
  }
}
