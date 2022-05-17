import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarCategoryController } from '@main/factories/controllers/car/category/Create';
import { makeListAllCarCategoriesController } from '@main/factories/controllers/car/category/ListAll';
import { makeUpdateCarCategoryController } from '@main/factories/controllers/car/category/Update';
import { makeAdminMiddleware } from '@main/factories/middlewares/Admin';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const carCategoriesRoutes = Router();

carCategoriesRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeCreateCarCategoryController())
);

carCategoriesRoutes.put(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeUpdateCarCategoryController())
);

carCategoriesRoutes.get('/', adaptRoute(makeListAllCarCategoriesController()));

export default carCategoriesRoutes;
