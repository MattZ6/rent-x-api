import { IUpdateCarSpecificationUseCase } from '@domain/usecases/car/specification/Update';

import { carSpecificationMock } from '../../../../../domain/models/car-specification.mock';

export class UpdateCarSpecificationUseCaseSpy
  implements IUpdateCarSpecificationUseCase
{
  async execute(
    _: IUpdateCarSpecificationUseCase.Input
  ): Promise<IUpdateCarSpecificationUseCase.Output> {
    return carSpecificationMock;
  }
}
