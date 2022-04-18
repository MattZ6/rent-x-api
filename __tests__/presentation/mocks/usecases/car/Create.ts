import { ICreateCarUseCase } from '@domain/usecases/car/Create';

import { carMock } from '../../../../domain/entities';

export class CreateCarUseCaseSpy implements ICreateCarUseCase {
  async execute(_: ICreateCarUseCase.Input): Promise<ICreateCarUseCase.Output> {
    return carMock;
  }
}
