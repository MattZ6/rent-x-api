import { ICarCategory } from '@domain/models/CarCategory';

export interface ICreateCarCategoryUseCase {
  execute(
    data: ICreateCarCategoryUseCase.Input
  ): Promise<ICreateCarCategoryUseCase.Output>;
}

export namespace ICreateCarCategoryUseCase {
  export type Input = {
    name: string;
    description: string;
  };

  export type Output = ICarCategory;
}
