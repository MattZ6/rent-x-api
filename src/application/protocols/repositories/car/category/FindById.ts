import { CarCategory } from '@domain/entities/CarCategory';

interface IFindCarCategoryByIdRepository {
  findById(
    data: IFindCarCategoryByIdRepository.Input
  ): Promise<IFindCarCategoryByIdRepository.Output>;
}

namespace IFindCarCategoryByIdRepository {
  export type Input = Pick<CarCategory, 'id'>;

  export type Output = CarCategory | null;
}

export { IFindCarCategoryByIdRepository };
