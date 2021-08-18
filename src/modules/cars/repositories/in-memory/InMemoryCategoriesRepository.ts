import { Category } from '@modules/cars/entities/Category';

import {
  CreateCategoryDTO,
  ICategoriesRepository,
} from '../ICategoriesRepository';

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(x => x.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(data: CreateCategoryDTO): Promise<void> {
    const user = new Category();

    Object.assign(user, {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    } as Category);

    this.categories.push(user);
  }
}
