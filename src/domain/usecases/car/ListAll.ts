import { Car } from '@domain/entities/Car';

interface IListAllCarsUseCase {
  execute(data: IListAllCarsUseCase.Input): Promise<IListAllCarsUseCase.Output>;
}

namespace IListAllCarsUseCase {
  export type SortBy = keyof Pick<
    Car,
    'name' | 'created_at' | 'horse_power' | 'number_of_seats' | 'max_speed'
  >;
  export type OrderBy = 'asc' | 'desc';
  export type Limit = number;
  export type Offset = number;

  export type Input = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    brand_id?: string;
    category_id?: string;
    limit?: Limit;
    offset?: Offset;
  };

  export type Output = Car[];
}

export { IListAllCarsUseCase };
