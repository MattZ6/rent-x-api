import { IReturnRentUseCase } from '@domain/usecases/rent/Return';

import { makeRentMock } from '../../../../domain/models';

export class ReturnRentUseCaseSpy implements IReturnRentUseCase {
  async execute(
    _: IReturnRentUseCase.Input
  ): Promise<IReturnRentUseCase.Output> {
    const { rent } = makeRentMock();

    return rent;
  }
}
