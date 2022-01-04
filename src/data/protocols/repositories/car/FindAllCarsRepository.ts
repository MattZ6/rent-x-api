import { ICar } from '@domain/models/Car';

export type FindAllCarsDTO = {
  order_by: keyof Pick<
    ICar,
    'name' | 'created_at' | 'horse_power' | 'number_of_seats' | 'max_speed'
  >;
  order: 'ASC' | 'DESC';
  take: number;
  skip: number;
  relations: Array<keyof Pick<ICar, 'brand' | 'category' | 'specifications'>>;
};

export interface IFindAllCarsRepository {
  findAll(data: FindAllCarsDTO): Promise<ICar[]>;
}
