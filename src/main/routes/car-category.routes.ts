import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarCategoryController } from '@main/factories/controllers/car/category/Create';
import { makeListAllCarCategoriesController } from '@main/factories/controllers/car/category/ListAll';
import { makeUpdateCarCategoryController } from '@main/factories/controllers/car/category/Update';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const carCategoriesRoutes = Router();

carCategoriesRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeCreateCarCategoryController())
);

carCategoriesRoutes.put(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeUpdateCarCategoryController())
);

carCategoriesRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeListAllCarCategoriesController())
);

export default carCategoriesRoutes;
