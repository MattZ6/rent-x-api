import { CarCategory } from '@domain/entities/CarCategory';

interface IListAllCarCategoriesUseCase {
  execute(
    data: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output>;
}

namespace IListAllCarCategoriesUseCase {
  export type SortBy = keyof Pick<CarCategory, 'name' | 'created_at'>;
  export type OrderBy = 'asc' | 'desc';
  export type Limit = number;
  export type Offset = number;

  export type Input = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
  };

  export type Output = CarCategory[];
}

export { IListAllCarCategoriesUseCase };
