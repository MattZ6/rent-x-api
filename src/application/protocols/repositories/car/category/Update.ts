import { CarCategory } from '@domain/entities/CarCategory';

interface IUpdateCarCategoryRepository {
  update(
    data: IUpdateCarCategoryRepository.Input
  ): Promise<IUpdateCarCategoryRepository.Output>;
}

namespace IUpdateCarCategoryRepository {
  export type Input = Pick<CarCategory, 'id'> &
    Pick<Partial<CarCategory>, 'name' | 'description'>;

  export type Output = CarCategory;
}

export { IUpdateCarCategoryRepository };
