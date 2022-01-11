import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeCreateRentController } from '@main/factories/controllers/rent/CreateRentControllerFactory';

const rentRoutes = Router();

rentRoutes.post(
  '/',
  authenticationMiddleware,
  adaptRoute(makeCreateRentController())
);

export default rentRoutes;
