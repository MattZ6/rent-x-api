import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarCategoryController } from '@main/factories/controllers/car/category/CreateCarCategoryControllerFactory';
import { makeListCarCategoriesController } from '@main/factories/controllers/car/category/ListCarCategoriesControllerFactory';
import { makeUpdateCarCategoryController } from '@main/factories/controllers/car/category/UpdateCarCategoryControllerFactory';
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
  adaptRoute(makeListCarCategoriesController())
);

export default carCategoriesRoutes;
