import type { CarSpecification } from '@domain/entities/CarSpecification';

interface IListAllCarSpecificationsUseCase {
  execute(
    data: IListAllCarSpecificationsUseCase.Input
  ): Promise<IListAllCarSpecificationsUseCase.Output>;
}

namespace IListAllCarSpecificationsUseCase {
  export type SortBy = keyof Pick<CarSpecification, 'name' | 'created_at'>;
  export type OrderBy = 'asc' | 'desc';
  export type Limit = number;
  export type Offset = number;

  export type Input = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
  };

  export type Output = CarSpecification[];
}

export { IListAllCarSpecificationsUseCase };
