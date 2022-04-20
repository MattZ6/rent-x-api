import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

import { makeCarCategoryMock } from '../../../../../domain';

export function makeListAllCarCategoriesUseCaseOutputMock(): IListAllCarCategoriesUseCase.Output {
  return [makeCarCategoryMock(), makeCarCategoryMock(), makeCarCategoryMock()];
}

export class ListAllCarCategoriesUseCaseSpy
  implements IListAllCarCategoriesUseCase
{
  async execute(
    _: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output> {
    return makeListAllCarCategoriesUseCaseOutputMock();
  }
}
