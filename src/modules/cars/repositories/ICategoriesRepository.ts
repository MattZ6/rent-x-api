import { Category } from '../infra/typeorm/entities/Category';

export type CreateCategoryDTO = {
  name: string;
  description: string;
};

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create(data: CreateCategoryDTO): Promise<void>;
}
