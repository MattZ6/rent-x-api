import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarSpecificationController } from '@main/factories/controllers/car/specification/CreateCarSpecificationControllerFactory';
import { makeDeleteCarSpecificationController } from '@main/factories/controllers/car/specification/DeleteCarSpecificationControllerFactory';
import { makeListCarSpecificationsController } from '@main/factories/controllers/car/specification/ListCarSpecificationsControllerFactory';
import { makeUpdateCarSpecificationController } from '@main/factories/controllers/car/specification/UpdateCarSpecificationControllerFactory';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const carSpecificationsRoutes = Router();

carSpecificationsRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeCreateCarSpecificationController())
);
carSpecificationsRoutes.put(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeUpdateCarSpecificationController())
);
carSpecificationsRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeListCarSpecificationsController())
);
carSpecificationsRoutes.delete(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeDeleteCarSpecificationController())
);

export default carSpecificationsRoutes;
