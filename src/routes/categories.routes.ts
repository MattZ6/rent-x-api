import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/use-cases/create-category';
import importCategoriesController from '../modules/cars/use-cases/import-categories';
import listCategoriesController from '../modules/cars/use-cases/list-categories';

const upload = multer({ dest: './temp' });

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) =>
  createCategoryController().handle(req, res)
);

categoriesRoutes.get('/', (req, res) =>
  listCategoriesController().handle(req, res)
);

categoriesRoutes.post('/import', upload.single('file'), (req, res) =>
  importCategoriesController().handle(req, res)
);

export { categoriesRoutes };
