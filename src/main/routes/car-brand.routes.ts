import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeCreateCarBrandController } from '@main/factories/controllers/car/brand/CreateCarBrandControllerFactory';
import { makeUpdateCarBrandController } from '@main/factories/controllers/car/brand/UpdateCarBrandControllerFactory';

const carBrandsRoutes = Router();

carBrandsRoutes.post(
  '/',
  authenticationMiddleware,
  adaptRoute(makeCreateCarBrandController())
);
carBrandsRoutes.post(
  '/:id',
  authenticationMiddleware,
  adaptRoute(makeUpdateCarBrandController())
);

export default carBrandsRoutes;
