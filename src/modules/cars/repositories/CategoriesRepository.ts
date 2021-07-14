import { Category } from '../models/Category';
import {
  CreateCategoryDTO,
  ICategoriesRepository,
} from './ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTACE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstace(): CategoriesRepository {
    if (!CategoriesRepository.INSTACE) {
      CategoriesRepository.INSTACE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTACE;
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
