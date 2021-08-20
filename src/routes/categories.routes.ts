import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/usecases/create-category/CreateCategoryController';
import { ImportCategoriesController } from '@modules/cars/usecases/import-categories/ImportCategoriesController';
import { ListCategoriesController } from '@modules/cars/usecases/list-categories/ListCategoriesController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';

const upload = multer({ dest: './temp' });

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

const routes = Router();

routes.post('/', ensureAuthenticated, createCategoryController.handle);

routes.get('/', ensureAuthenticated, listCategoriesController.handle);

routes.post(
  '/import',
  ensureAuthenticated,
  upload.single('file'),
  importCategoriesController.handle
);

export default routes;
