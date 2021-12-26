import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/CreateCarSpecification';

import { carSpecificationMock } from '../../domain/models/car-specification.mock';

export class CreateCarSpecificationUseCaseSpy
  implements ICreateCarSpecificationUseCase
{
  async execute(
    _: ICreateCarSpecificationUseCase.Input
  ): Promise<ICreateCarSpecificationUseCase.Output> {
    return carSpecificationMock;
  }
}
