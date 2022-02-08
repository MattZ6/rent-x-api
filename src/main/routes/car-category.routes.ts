import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeCreateCarCategoryController } from '@main/factories/controllers/car/category/CreateCarCategoryControllerFactory';
import { makeListCarCategoriesController } from '@main/factories/controllers/car/category/ListCarCategoriesControllerFactory';
import { makeUpdateCarCategoryController } from '@main/factories/controllers/car/category/UpdateCarCategoryControllerFactory';

const carCategoriesRoutes = Router();

carCategoriesRoutes.post(
  '/',
  authenticationMiddleware,
  adaptRoute(makeCreateCarCategoryController())
);

carCategoriesRoutes.put(
  '/:id',
  authenticationMiddleware,
  adaptRoute(makeUpdateCarCategoryController())
);

carCategoriesRoutes.get(
  '/',
  authenticationMiddleware,
  adaptRoute(makeListCarCategoriesController())
);

export default carCategoriesRoutes;
