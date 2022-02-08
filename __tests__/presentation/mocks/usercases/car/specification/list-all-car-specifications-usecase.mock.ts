import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAllCarSpecifications';

export class ListAllCarSpecificationsUseCaseSpy
  implements IListAllCarSpecificationsUseCase
{
  async execute(
    _: IListAllCarSpecificationsUseCase.Input
  ): Promise<IListAllCarSpecificationsUseCase.Output> {
    return [];
  }
}
