import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/Create';

import { makeCarSpecificationMock } from '../../../../../domain/entities';

export function makeCreateCarSpecificationUseCaseOutputMock(): ICreateCarSpecificationUseCase.Output {
  return makeCarSpecificationMock();
}

export class CreateCarSpecificationUseCaseSpy
  implements ICreateCarSpecificationUseCase
{
  async execute(
    _: ICreateCarSpecificationUseCase.Input
  ): Promise<ICreateCarSpecificationUseCase.Output> {
    return makeCreateCarSpecificationUseCaseOutputMock();
  }
}
