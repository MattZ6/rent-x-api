import { ICarCategory } from '@domain/models/CarCategory';

export interface IListAllCarCategorysUseCase {
  execute(
    data: IListAllCarCategorysUseCase.Input
  ): Promise<IListAllCarCategorysUseCase.Output>;
}

export namespace IListAllCarCategorysUseCase {
  export type Input = {
    limit?: number;
    page?: number;
  };

  export type Output = ICarCategory[];
}
