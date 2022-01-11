import { ICarBrand } from '@domain/models/CarBrand';

interface IListAllCarBrandsUseCase {
  execute(
    data: IListAllCarBrandsUseCase.Input
  ): Promise<IListAllCarBrandsUseCase.Output>;
}

namespace IListAllCarBrandsUseCase {
  export type OrderBy = keyof Pick<ICarBrand, 'name' | 'created_at'>;

  export type Order = 'ASC' | 'DESC';

  export type Input = {
    order_by: OrderBy;
    order: Order;
    limit: number;
    page: number;
  };

  export type Output = ICarBrand[];
}

export { IListAllCarBrandsUseCase };
