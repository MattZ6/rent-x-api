import { IDeleteCarSpecificationUseCase } from '@domain/usecases/car/specification/DeleteCarSpecification';

export class DeleteCarSpecificationUseCaseSpy
  implements IDeleteCarSpecificationUseCase
{
  async execute(
    _: IDeleteCarSpecificationUseCase.Input
  ): Promise<IDeleteCarSpecificationUseCase.Output> {
    // That's all folks 🥕
  }
}
