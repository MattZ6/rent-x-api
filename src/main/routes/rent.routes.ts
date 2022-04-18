import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateRentController } from '@main/factories/controllers/rent/Create';
import { makeReturnRentController } from '@main/factories/controllers/rent/Return';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const rentRoutes = Router();

rentRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeCreateRentController())
);

rentRoutes.post(
  '/:id/return',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeReturnRentController())
);

export default rentRoutes;
