import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeCreateCarCategoryController } from '@main/factories/controllers/car/category/CreateCarCategoryControllerFactory';
import { makeUpdateCarCategoryController } from '@main/factories/controllers/car/category/UpdateCarCategoryControllerFactory';

const carCategoriesRoutes = Router();

carCategoriesRoutes.post(
  '/',
  authenticationMiddleware,
  adaptRoute(makeCreateCarCategoryController())
);

carCategoriesRoutes.put(
  '/',
  authenticationMiddleware,
  adaptRoute(makeUpdateCarCategoryController())
);

export default carCategoriesRoutes;
