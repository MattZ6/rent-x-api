import { Category } from '../models/Category';

export type CreateCategoryDTO = {
  name: string;
  description: string;
};

export interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  list(): Category[];
  create(data: CreateCategoryDTO): void;
}
