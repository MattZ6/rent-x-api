import { ICarCategory } from '@domain/models/CarCategory';

export interface IListAllCarCategoriesUseCase {
  execute(
    data: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output>;
}

export namespace IListAllCarCategoriesUseCase {
  export type Input = {
    limit?: number;
    page?: number;
  };

  export type Output = ICarCategory[];
}
