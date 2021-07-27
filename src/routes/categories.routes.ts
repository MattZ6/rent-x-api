import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/use-cases/create-category/CreateCategoryController';
import { ImportCategoriesController } from '../modules/cars/use-cases/import-categories/ImportCategoriesController';
import { ListCategoriesController } from '../modules/cars/use-cases/list-categories/ListCategoriesController';

const upload = multer({ dest: './temp' });

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle
);

export { categoriesRoutes };
