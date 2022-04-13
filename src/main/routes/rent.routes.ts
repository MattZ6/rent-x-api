import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/route';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeCreateRentController } from '@main/factories/controllers/rent/CreateRentControllerFactory';
import { makeReturnRentController } from '@main/factories/controllers/rent/ReturnRentControllerFactory';

const rentRoutes = Router();

rentRoutes.post(
  '/',
  authenticationMiddleware,
  adaptRoute(makeCreateRentController())
);

rentRoutes.post(
  '/:id/return',
  authenticationMiddleware,
  adaptRoute(makeReturnRentController())
);

export default rentRoutes;
