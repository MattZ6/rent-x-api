import { ICarSpecification } from '@domain/models/CarSpecification';

export interface IListAllCarSpecificationsUseCase {
  execute(
    data: IListAllCarSpecificationsUseCase.Input
  ): Promise<IListAllCarSpecificationsUseCase.Output>;
}

export namespace IListAllCarSpecificationsUseCase {
  export type OrderBy = keyof Pick<ICarSpecification, 'name' | 'created_at'>;

  export type Order = 'ASC' | 'DESC';

  export type Input = {
    order_by: OrderBy;
    order: Order;
    limit: number;
    page: number;
  };

  export type Output = ICarSpecification[];
}
