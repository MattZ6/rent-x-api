import { ICarCategory } from '@domain/entities/CarCategory';

interface IFindAllCarCategoriesRepository {
  findAll(
    data: IFindAllCarCategoriesRepository.Input
  ): Promise<IFindAllCarCategoriesRepository.Output>;
}

namespace IFindAllCarCategoriesRepository {
  export type Input = {
    order_by: keyof Pick<ICarCategory, 'name' | 'created_at'>;
    order: 'ASC' | 'DESC';
    take: number;
    skip: number;
  };

  export type Output = ICarCategory[];
}

export { IFindAllCarCategoriesRepository };
