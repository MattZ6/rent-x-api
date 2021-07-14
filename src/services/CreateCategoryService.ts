import { CategoriesRepository } from '../repositories/CategoriesRepository';

type Request = {
  name: string;
  description: string;
};

export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: Request): void {
    const category = this.categoriesRepository.findByName(name);

    if (category) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}
