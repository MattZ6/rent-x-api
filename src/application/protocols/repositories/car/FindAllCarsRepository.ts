import { ICar } from '@domain/entities/Car';

interface IFindAllCarsRepository {
  findAll(
    data: IFindAllCarsRepository.Input
  ): Promise<IFindAllCarsRepository.Output>;
}

namespace IFindAllCarsRepository {
  export type Input = {
    order_by: keyof Pick<
      ICar,
      'name' | 'created_at' | 'horse_power' | 'number_of_seats' | 'max_speed'
    >;
    order: 'ASC' | 'DESC';
    take: number;
    skip: number;
    relations: Array<keyof Pick<ICar, 'brand' | 'category' | 'specifications'>>;
  };

  export type Output = ICar[];
}

export { IFindAllCarsRepository };
