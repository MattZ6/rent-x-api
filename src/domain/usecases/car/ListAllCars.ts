import { ICar } from '@domain/models/Car';

interface IListAllCarsUseCase {
  execute(data: IListAllCarsUseCase.Input): Promise<IListAllCarsUseCase.Output>;
}

namespace IListAllCarsUseCase {
  export type OrderBy = keyof Pick<
    ICar,
    'name' | 'created_at' | 'horse_power' | 'number_of_seats' | 'max_speed'
  >;

  export type Order = 'ASC' | 'DESC';

  export type Input = {
    order_by: OrderBy;
    order: Order;
    limit: number;
    page: number;
  };

  export type Output = ICar[];
}

export { IListAllCarsUseCase };
