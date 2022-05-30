import { IListAllAvailableCarsUseCase } from '@domain/usecases/car/ListAllAvailable';

import { makeCarMock } from '../../../../domain';

export function makeListAllAvailableCarsUseCaseOutputMock(): IListAllAvailableCarsUseCase.Output {
  return [makeCarMock(), makeCarMock(), makeCarMock()];
}

export class ListAllAvailableCarsUseCaseSpy
  implements IListAllAvailableCarsUseCase
{
  async execute(
    _: IListAllAvailableCarsUseCase.Input
  ): Promise<IListAllAvailableCarsUseCase.Output> {
    return makeListAllAvailableCarsUseCaseOutputMock();
  }
}
