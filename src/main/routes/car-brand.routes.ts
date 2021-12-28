import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeCreateCarBrandController } from '@main/factories/controllers/car/brand/CreateCarBrandControllerFactory';

const carBrandsRoutes = Router();

carBrandsRoutes.post(
  '/',
  authenticationMiddleware,
  adaptRoute(makeCreateCarBrandController())
);

export default carBrandsRoutes;
