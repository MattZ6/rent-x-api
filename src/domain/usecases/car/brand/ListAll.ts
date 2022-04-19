import { CarBrand } from '@domain/entities/CarBrand';

interface IListAllCarBrandsUseCase {
  execute(
    data: IListAllCarBrandsUseCase.Input
  ): Promise<IListAllCarBrandsUseCase.Output>;
}

namespace IListAllCarBrandsUseCase {
  export type SortBy = keyof Pick<CarBrand, 'name' | 'created_at'>;
  export type OrderBy = 'asc' | 'desc';
  export type Limit = number;
  export type Offset = number;

  export type Input = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
  };

  export type Output = CarBrand[];
}

export { IListAllCarBrandsUseCase };
