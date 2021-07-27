import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/use-cases/create-category/CreateCategoryController';
import importCategoriesController from '../modules/cars/use-cases/import-categories';
import { ListCategoriesController } from '../modules/cars/use-cases/list-categories/ListCategoriesController';

const upload = multer({ dest: './temp' });

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single('file'), (req, res) =>
  importCategoriesController().handle(req, res)
);

export { categoriesRoutes };
