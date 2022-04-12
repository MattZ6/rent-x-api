import { ICarCategory } from '@domain/models/CarCategory';

interface IFindCarCategoryByIdRepository {
  findById(
    data: IFindCarCategoryByIdRepository.Input
  ): Promise<IFindCarCategoryByIdRepository.Output>;
}

namespace IFindCarCategoryByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = ICarCategory | undefined;
}

export { IFindCarCategoryByIdRepository };
