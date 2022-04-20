import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

import { makeCarMock } from '../../../../domain';

export function makeListAllCarsUseCaseOutputMock(): IListAllCarsUseCase.Output {
  return [makeCarMock(), makeCarMock(), makeCarMock()];
}

export class ListAllCarsUseCaseSpy implements IListAllCarsUseCase {
  async execute(
    _: IListAllCarsUseCase.Input
  ): Promise<IListAllCarsUseCase.Output> {
    return makeListAllCarsUseCaseOutputMock();
  }
}
