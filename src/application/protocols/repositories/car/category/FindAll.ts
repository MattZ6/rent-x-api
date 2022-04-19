import { CarCategory } from '@domain/entities/CarCategory';

interface IFindAllCarCategoriesRepository {
  findAll(
    data: IFindAllCarCategoriesRepository.Input
  ): Promise<IFindAllCarCategoriesRepository.Output>;
}

namespace IFindAllCarCategoriesRepository {
  export type SortBy = keyof Pick<CarCategory, 'name' | 'created_at'>;
  export type OrderBy = 'asc' | 'desc';
  export type Take = number;
  export type Skip = number;

  export type Input = {
    sort_by: SortBy;
    order_by: OrderBy;
    take: Take;
    skip: Skip;
  };

  export type Output = CarCategory[];
}

export { IFindAllCarCategoriesRepository };
