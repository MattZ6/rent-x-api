import { ICreateCarUseCase } from '@domain/usecases/car/CreateCar';

import { carMock } from '../../domain/models/car.mock';

export class CreateCarUseCaseSpy implements ICreateCarUseCase {
  async execute(_: ICreateCarUseCase.Input): Promise<ICreateCarUseCase.Output> {
    return carMock;
  }
}
