import { ICarCategory } from '@domain/models/CarCategory';

export interface IUpdateCarCategoryUseCase {
  execute(
    data: IUpdateCarCategoryUseCase.Input
  ): Promise<IUpdateCarCategoryUseCase.Output>;
}

export namespace IUpdateCarCategoryUseCase {
  export type Input = {
    id: string;
    name: string;
    description: string;
  };

  export type Output = ICarCategory;
}
