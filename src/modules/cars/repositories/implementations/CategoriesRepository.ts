import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import {
  CreateCategoryDTO,
  ICategoriesRepository,
} from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name });
  }

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }
}
