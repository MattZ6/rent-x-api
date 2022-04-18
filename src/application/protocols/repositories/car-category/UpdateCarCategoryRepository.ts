import { ICarCategory } from '@domain/entities/CarCategory';

interface IUpdateCarCategoryRepository {
  update(
    data: IUpdateCarCategoryRepository.Input
  ): Promise<IUpdateCarCategoryRepository.Output>;
}

namespace IUpdateCarCategoryRepository {
  export type Input = ICarCategory;

  export type Output = ICarCategory;
}

export { IUpdateCarCategoryRepository };
