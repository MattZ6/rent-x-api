import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

type Request = {
  name: string;
  description: string;
};

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: Request): void {
    const category = this.categoriesRepository.findByName(name);

    if (category) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}
