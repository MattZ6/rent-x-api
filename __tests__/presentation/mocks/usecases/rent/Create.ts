import { ICreateRentUseCase } from '@domain/usecases/rent/Create';

import { makeRentMock } from '../../../../domain';

export function makeCreateRentUseCaseOutputMock(): ICreateRentUseCase.Output {
  return makeRentMock();
}

export class CreateRentUseCaseSpy implements ICreateRentUseCase {
  async execute(
    _: ICreateRentUseCase.Input
  ): Promise<ICreateRentUseCase.Output> {
    return makeCreateRentUseCaseOutputMock();
  }
}
