import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarBrandController } from '@main/factories/controllers/car/brand/Create';
import { makeListAllCarBrandsController } from '@main/factories/controllers/car/brand/ListAll';
import { makeUpdateCarBrandController } from '@main/factories/controllers/car/brand/Update';
import { makeAdminMiddleware } from '@main/factories/middlewares/Admin';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const carBrandsRoutes = Router();

carBrandsRoutes.get('/', adaptRoute(makeListAllCarBrandsController()));

carBrandsRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeCreateCarBrandController())
);

carBrandsRoutes.put(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeUpdateCarBrandController())
);

export default carBrandsRoutes;
