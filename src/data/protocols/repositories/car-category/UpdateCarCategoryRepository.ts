import { ICarCategory } from '@domain/models/CarCategory';

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
