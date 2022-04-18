import { ICreateCarBrandUseCase } from '@domain/usecases/car/brand/Create';

import { carBrandMock } from '../../../../../domain/models/car-brand.mock';

export class CreateCarBrandUseCaseSpy implements ICreateCarBrandUseCase {
  async execute(
    _: ICreateCarBrandUseCase.Input
  ): Promise<ICreateCarBrandUseCase.Output> {
    return carBrandMock;
  }
}
