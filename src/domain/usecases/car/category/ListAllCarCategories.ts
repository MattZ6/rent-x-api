import { ICarCategory } from '@domain/models/CarCategory';

export interface IListAllCarCategoriesUseCase {
  execute(
    data: IListAllCarCategoriesUseCase.Input
  ): Promise<IListAllCarCategoriesUseCase.Output>;
}

export namespace IListAllCarCategoriesUseCase {
  export type OrderBy = keyof Pick<ICarCategory, 'name' | 'created_at'>;

  export type Order = 'ASC' | 'DESC';

  export type Input = {
    order_by: OrderBy;
    order: Order;
    limit: number;
    page: number;
  };

  export type Output = ICarCategory[];
}
