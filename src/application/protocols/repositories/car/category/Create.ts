import { CarCategory } from '@domain/entities/CarCategory';

interface ICreateCarCategoryRepository {
  create(
    data: ICreateCarCategoryRepository.Input
  ): Promise<ICreateCarCategoryRepository.Output>;
}

namespace ICreateCarCategoryRepository {
  export type Input = Pick<CarCategory, 'name' | 'description'>;

  export type Output = CarCategory;
}

export { ICreateCarCategoryRepository };
