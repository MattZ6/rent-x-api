import { IUpdateCarSpecificationUseCase } from '@domain/usecases/car/specification/Update';

import { makeCarSpecificationMock } from '../../../../../domain/entities';

export function makeUpdateCarSpecificationUseCaseOutputMock(): IUpdateCarSpecificationUseCase.Output {
  return makeCarSpecificationMock();
}
export class UpdateCarSpecificationUseCaseSpy
  implements IUpdateCarSpecificationUseCase
{
  async execute(
    _: IUpdateCarSpecificationUseCase.Input
  ): Promise<IUpdateCarSpecificationUseCase.Output> {
    return makeUpdateCarSpecificationUseCaseOutputMock();
  }
}
