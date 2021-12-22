import { ICarCategory } from '@domain/models/CarCategory';

export type FindAllCarCategoriesDTO = {
  take: number;
  skip: number;
};

export interface IFindAllCarCategoriesRepository {
  findAll(data: FindAllCarCategoriesDTO): Promise<ICarCategory[]>;
}
