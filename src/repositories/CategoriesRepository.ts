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
