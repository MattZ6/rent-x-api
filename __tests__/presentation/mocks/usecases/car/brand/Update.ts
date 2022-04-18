import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/Update';

import { carBrandMock } from '../../../../../domain/entities';

export class UpdateCarBrandUseCaseSpy implements IUpdateCarBrandUseCase {
  async execute(
    _: IUpdateCarBrandUseCase.Input
  ): Promise<IUpdateCarBrandUseCase.Output> {
    return carBrandMock;
  }
}
