import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetDetails';

import { carMock } from '../../../../domain/models';

export class GetCarDetailsUseCaseSpy implements IGetCarDetailsUseCase {
  async execute(
    _: IGetCarDetailsUseCase.Input
  ): Promise<IGetCarDetailsUseCase.Output> {
    return carMock;
  }
}
