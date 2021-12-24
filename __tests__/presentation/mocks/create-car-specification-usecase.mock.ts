import { ICarSpecification } from '@domain/models/CarSpecification';
import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/CreateCarSpecification';

import { carMock } from '../../domain/models/car.mock';

export class CreateCarSpecificationUseCaseSpy
  implements ICreateCarSpecificationUseCase
{
  async execute(
    _: ICreateCarSpecificationUseCase.Input
  ): Promise<ICarSpecification> {
    return carMock;
  }
}
