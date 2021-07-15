import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoriesController } from './ImportCategoriesController';
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

const categoriesRepository = CategoriesRepository.getInstace();
const importCategoriesUseCase = new ImportCategoriesUseCase(
  categoriesRepository
);
export const importCategoriesController = new ImportCategoriesController(
  importCategoriesUseCase
);
