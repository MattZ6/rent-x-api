import { IListAllCarsUseCase } from '@domain/usecases/car/ListAllCars';

export class ListAllCarsUseCaseSpy implements IListAllCarsUseCase {
  async execute(
    _: IListAllCarsUseCase.Input
  ): Promise<IListAllCarsUseCase.Output> {
    return [];
  }
}
