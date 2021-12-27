import { ICarCategory } from '@domain/models/CarCategory';

export type FindAllCarCategoriesDTO = {
  order_by: keyof Pick<ICarCategory, 'name' | 'created_at'>;
  order: 'ASC' | 'DESC';
  take: number;
  skip: number;
};

export interface IFindAllCarCategoriesRepository {
  findAll(data: FindAllCarCategoriesDTO): Promise<ICarCategory[]>;
}
