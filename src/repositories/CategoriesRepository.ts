import { Category } from '../models/Category';

type CreateCategoryDTO = {
  name: string;
  description: string;
};

export class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: CreateCategoryDTO): void {
    const category = new Category({ name, description });

    this.categories.push(category);
  }
}
