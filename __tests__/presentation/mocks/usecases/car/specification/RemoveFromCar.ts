import { IRemoveSpecificationFromCarUseCase } from '@domain/usecases/car/specification/RemoveFromCar';

export class RemoveSpecificationFromCarUseCaseSpy
  implements IRemoveSpecificationFromCarUseCase
{
  async execute(
    _: IRemoveSpecificationFromCarUseCase.Input
  ): Promise<IRemoveSpecificationFromCarUseCase.Output> {
    // That's all folks 🥕
  }
}
