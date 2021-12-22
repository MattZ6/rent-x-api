import { ICarCategory } from '@domain/models/CarCategory';

export type CreateCarCategoryDTO = {
  name: string;
  description: string;
};

export interface ICreateCarCategoryRepository {
  create(data: CreateCarCategoryDTO): Promise<ICarCategory>;
}
