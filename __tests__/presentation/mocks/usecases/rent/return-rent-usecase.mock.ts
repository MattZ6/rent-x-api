import { IReturnRentUseCase } from '@domain/usecases/rent/ReturnRent';

import { makeRentMock } from '../../../../domain/models/rent.mock';

export class ReturnRentUseCaseSpy implements IReturnRentUseCase {
  async execute(
    _: IReturnRentUseCase.Input
  ): Promise<IReturnRentUseCase.Output> {
    const { rent } = makeRentMock();

    return rent;
  }
}
