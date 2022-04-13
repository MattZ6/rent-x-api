import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarBrandController } from '@main/factories/controllers/car/brand/CreateCarBrandControllerFactory';
import { makeListCarBrandsController } from '@main/factories/controllers/car/brand/ListCarBrandsControllerFactory';
import { makeUpdateCarBrandController } from '@main/factories/controllers/car/brand/UpdateCarBrandControllerFactory';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const carBrandsRoutes = Router();

carBrandsRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeListCarBrandsController())
);
carBrandsRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeCreateCarBrandController())
);
carBrandsRoutes.put(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeUpdateCarBrandController())
);

export default carBrandsRoutes;
