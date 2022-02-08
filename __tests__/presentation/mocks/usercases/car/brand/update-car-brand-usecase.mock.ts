import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/UpdateCarBrand';

import { carBrandMock } from '../../../../../domain/models/car-brand.mock';

export class UpdateCarBrandUseCaseSpy implements IUpdateCarBrandUseCase {
  async execute(
    _: IUpdateCarBrandUseCase.Input
  ): Promise<IUpdateCarBrandUseCase.Output> {
    return carBrandMock;
  }
}
