import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeCreateCarController } from '@main/factories/controllers/car/CreateCarControllerFactory';
import { makeListCarsController } from '@main/factories/controllers/car/ListCarsControllerFactory';

const carsRoutes = Router();

carsRoutes.post(
  '/',
  authenticationMiddleware,
  adaptRoute(makeCreateCarController())
);

carsRoutes.get(
  '/',
  authenticationMiddleware,
  adaptRoute(makeListCarsController())
);

export default carsRoutes;
