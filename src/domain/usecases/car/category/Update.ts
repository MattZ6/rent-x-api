import { ICarCategory } from '@domain/entities/CarCategory';

interface IUpdateCarCategoryUseCase {
  execute(
    data: IUpdateCarCategoryUseCase.Input
  ): Promise<IUpdateCarCategoryUseCase.Output>;
}

namespace IUpdateCarCategoryUseCase {
  export type Input = {
    id: string;
    name: string;
    description: string;
  };

  export type Output = ICarCategory;
}

export { IUpdateCarCategoryUseCase };
