import { ICarCategory } from '@domain/entities/CarCategory';

interface ICreateCarCategoryRepository {
  create(
    data: ICreateCarCategoryRepository.Input
  ): Promise<ICreateCarCategoryRepository.Output>;
}

namespace ICreateCarCategoryRepository {
  export type Input = {
    name: string;
    description: string;
  };

  export type Output = ICarCategory;
}

export { ICreateCarCategoryRepository };
