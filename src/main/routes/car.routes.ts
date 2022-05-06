import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarController } from '@main/factories/controllers/car/Create';
import { makeGetCarDetailsController } from '@main/factories/controllers/car/GetDetails';
import { makeListCarsController } from '@main/factories/controllers/car/ListAll';
import { makeAdminMiddleware } from '@main/factories/middlewares/Admin';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const carsRoutes = Router();

carsRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeCreateCarController())
);

carsRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeListCarsController())
);

carsRoutes.get(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeGetCarDetailsController())
);

export default carsRoutes;
