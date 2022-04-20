import { CarCategory } from '@domain/entities/CarCategory';

interface IUpdateCarCategoryUseCase {
  execute(
    data: IUpdateCarCategoryUseCase.Input
  ): Promise<IUpdateCarCategoryUseCase.Output>;
}

namespace IUpdateCarCategoryUseCase {
  export type Input = Pick<CarCategory, 'name' | 'description'> & {
    id: string;
  };

  export type Output = CarCategory;
}

export { IUpdateCarCategoryUseCase };
