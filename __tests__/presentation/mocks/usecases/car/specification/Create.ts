import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/Create';

import { carSpecificationMock } from '../../../../../domain/models';

export class CreateCarSpecificationUseCaseSpy
  implements ICreateCarSpecificationUseCase
{
  async execute(
    _: ICreateCarSpecificationUseCase.Input
  ): Promise<ICreateCarSpecificationUseCase.Output> {
    return carSpecificationMock;
  }
}
