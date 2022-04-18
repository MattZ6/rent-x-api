import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

export class ListAllCarCategoriesUseCaseSpy
  implements IListAllCarCategoriesUseCase
{
  async execute(
    _: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output> {
    return [];
  }
}
