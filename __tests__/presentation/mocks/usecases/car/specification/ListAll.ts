import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAll';

import { makeCarSpecificationMock } from '../../../../../domain';

export function makeListAllCarSpecificationsUseCaseOutputMock(): IListAllCarSpecificationsUseCase.Output {
  return [
    makeCarSpecificationMock(),
    makeCarSpecificationMock(),
    makeCarSpecificationMock(),
  ];
}

export class ListAllCarSpecificationsUseCaseSpy
  implements IListAllCarSpecificationsUseCase
{
  async execute(
    _: IListAllCarSpecificationsUseCase.Input
  ): Promise<IListAllCarSpecificationsUseCase.Output> {
    return makeListAllCarSpecificationsUseCaseOutputMock();
  }
}
