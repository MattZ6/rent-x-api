import { ICarBrand } from '@domain/models/CarBrand';

export interface IListAllCarBrandsUseCase {
  execute(
    data: IListAllCarBrandsUseCase.Input
  ): Promise<IListAllCarBrandsUseCase.Output>;
}

export namespace IListAllCarBrandsUseCase {
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
