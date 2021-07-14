import { Router } from 'express';

import { createCategoryController } from '../modules/cars/use-cases/create-category';
import { listCategoriesController } from '../modules/cars/use-cases/list-categories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) =>
  createCategoryController.handle(req, res)
);

categoriesRoutes.get('/', (req, res) =>
  listCategoriesController.handle(req, res)
);

export { categoriesRoutes };
