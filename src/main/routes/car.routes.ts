import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeCreateCarController } from '@main/factories/controllers/car/CreateCarControllerFactory';
import { makeGetCarDetailsController } from '@main/factories/controllers/car/GetCarDetailsControllerFactory';
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

carsRoutes.get(
  '/:id',
  authenticationMiddleware,
  adaptRoute(makeGetCarDetailsController())
);

export default carsRoutes;
