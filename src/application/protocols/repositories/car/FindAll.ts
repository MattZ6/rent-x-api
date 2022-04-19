import { Car } from '@domain/entities/Car';

interface IFindAllCarsRepository {
  findAll(
    data: IFindAllCarsRepository.Input
  ): Promise<IFindAllCarsRepository.Output>;
}

namespace IFindAllCarsRepository {
  export type SortBy = keyof Pick<
    Car,
    'name' | 'created_at' | 'horse_power' | 'number_of_seats' | 'max_speed'
  >;
  export type OrderBy = 'asc' | 'desc';
  export type Take = number;
  export type Skip = number;

  export type Input = {
    sort_by: SortBy;
    order_by: OrderBy;
    take: Take;
    skip: Skip;
  };

  export type Output = Car[];
}

export { IFindAllCarsRepository };
