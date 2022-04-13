import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarController } from '@main/factories/controllers/car/CreateCarControllerFactory';
import { makeGetCarDetailsController } from '@main/factories/controllers/car/GetCarDetailsControllerFactory';
import { makeListCarsController } from '@main/factories/controllers/car/ListCarsControllerFactory';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const carsRoutes = Router();

carsRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeCreateCarController())
);

carsRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeListCarsController())
);

carsRoutes.get(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeGetCarDetailsController())
);

export default carsRoutes;
