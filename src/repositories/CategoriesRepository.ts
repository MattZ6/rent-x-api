import { Category } from '../models/Category';
import {
  CreateCategoryDTO,
  ICategoriesRepository,
} from './ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  findByName(name: string): Category | undefined {
    return this.categories.find(
      x => x.name.toLowerCase() === name.toLowerCase()
    );
  }

  create({ name, description }: CreateCategoryDTO): void {
    const category = new Category({ name, description });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }
}
