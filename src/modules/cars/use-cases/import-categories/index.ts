import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoriesController } from './ImportCategoriesController';
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

export default (): ImportCategoriesController => {
  const categoriesRepository = new CategoriesRepository();
  const importCategoriesUseCase = new ImportCategoriesUseCase(
    categoriesRepository
  );

  return new ImportCategoriesController(importCategoriesUseCase);
};
