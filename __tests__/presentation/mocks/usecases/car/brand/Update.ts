import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/Update';

import { carBrandMock } from '../../../../../domain/models';

export class UpdateCarBrandUseCaseSpy implements IUpdateCarBrandUseCase {
  async execute(
    _: IUpdateCarBrandUseCase.Input
  ): Promise<IUpdateCarBrandUseCase.Output> {
    return carBrandMock;
  }
}
