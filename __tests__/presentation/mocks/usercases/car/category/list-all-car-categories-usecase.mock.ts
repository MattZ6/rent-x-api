import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAllCarCategories';

export class ListAllCarCategoriesUseCaseSpy
  implements IListAllCarCategoriesUseCase
{
  async execute(
    _: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output> {
    return [];
  }
}
