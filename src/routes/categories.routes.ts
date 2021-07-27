import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/use-cases/create-category';
import importCategoriesController from '../modules/cars/use-cases/import-categories';
import { ListCategoriesController } from '../modules/cars/use-cases/list-categories/ListCategoriesController';

const upload = multer({ dest: './temp' });

const listCategoriesController = new ListCategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) =>
  createCategoryController().handle(req, res)
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single('file'), (req, res) =>
  importCategoriesController().handle(req, res)
);

export { categoriesRoutes };
