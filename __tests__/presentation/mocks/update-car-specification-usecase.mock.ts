import { ICarSpecification } from '@domain/models/CarSpecification';
import { IUpdateCarSpecificationUseCase } from '@domain/usecases/car/specification/UpdateCarSpecification';

import { carMock } from '../../domain/models/car.mock';

export class UpdateCarSpecificationUseCaseSpy
  implements IUpdateCarSpecificationUseCase
{
  async execute(
    _: IUpdateCarSpecificationUseCase.Input
  ): Promise<ICarSpecification> {
    return carMock;
  }
}
