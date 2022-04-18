import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarSpecificationController } from '@main/factories/controllers/car/specification/Create';
import { makeDeleteCarSpecificationController } from '@main/factories/controllers/car/specification/Delete';
import { makeListAllCarSpecificationsController } from '@main/factories/controllers/car/specification/ListAll';
import { makeUpdateCarSpecificationController } from '@main/factories/controllers/car/specification/Update';
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
  adaptRoute(makeListAllCarSpecificationsController())
);
carSpecificationsRoutes.delete(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeDeleteCarSpecificationController())
);

export default carSpecificationsRoutes;
