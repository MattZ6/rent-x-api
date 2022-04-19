import { CarCategory } from '@domain/entities/CarCategory';

interface ICreateCarCategoryUseCase {
  execute(
    data: ICreateCarCategoryUseCase.Input
  ): Promise<ICreateCarCategoryUseCase.Output>;
}

namespace ICreateCarCategoryUseCase {
  export type Input = Pick<CarCategory, 'name' | 'description'>;

  export type Output = CarCategory;
}

export { ICreateCarCategoryUseCase };
