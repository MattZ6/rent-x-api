import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetDetails';

import { carMock } from '../../../../domain/entities';

export class GetCarDetailsUseCaseSpy implements IGetCarDetailsUseCase {
  async execute(
    _: IGetCarDetailsUseCase.Input
  ): Promise<IGetCarDetailsUseCase.Output> {
    return carMock;
  }
}
