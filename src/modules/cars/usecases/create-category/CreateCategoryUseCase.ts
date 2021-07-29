import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

type Request = {
  name: string;
  description: string;
};

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: Request): Promise<void> {
    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      throw new Error('Category already exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}
