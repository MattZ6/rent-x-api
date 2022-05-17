import { IAddSpecificationsToCarUseCase } from '@domain/usecases/car/specification/AddToCar';

export class AddSpecificationsToCarUseCaseSpy
  implements IAddSpecificationsToCarUseCase
{
  async execute(
    _: IAddSpecificationsToCarUseCase.Input
  ): Promise<IAddSpecificationsToCarUseCase.Output> {
    // That's all folks 🥕
  }
}
