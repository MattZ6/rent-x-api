import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
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
      throw new AppError('Category already exists', 422);
    }

    await this.categoriesRepository.create({ name, description });
  }
}