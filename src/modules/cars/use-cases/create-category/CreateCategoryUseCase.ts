import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

type Request = {
  name: string;
  description: string;
};

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: Request): Promise<void> {
    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      throw new Error('Category already exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}
