import { IDeleteCarSpecificationUseCase } from '@domain/usecases/car/specification/Delete';

export class DeleteCarSpecificationUseCaseSpy
  implements IDeleteCarSpecificationUseCase
{
  async execute(
    _: IDeleteCarSpecificationUseCase.Input
  ): Promise<IDeleteCarSpecificationUseCase.Output> {
    // That's all folks 🥕
  }
}
