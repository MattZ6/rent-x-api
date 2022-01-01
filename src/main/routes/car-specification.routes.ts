import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeCreateCarSpecificationController } from '@main/factories/controllers/car/specification/CreateCarSpecificationControllerFactory';
import { makeUpdateCarSpecificationController } from '@main/factories/controllers/car/specification/UpdateCarSpecificationControllerFactory';

const carSpecificationsRoutes = Router();

carSpecificationsRoutes.post(
  '/',
  authenticationMiddleware,
  adaptRoute(makeCreateCarSpecificationController())
);
carSpecificationsRoutes.put(
  '/:id',
  authenticationMiddleware,
  adaptRoute(makeUpdateCarSpecificationController())
);

export default carSpecificationsRoutes;
