import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarSpecificationController } from '@main/factories/controllers/car/specification/Create';
import { makeDeleteCarSpecificationController } from '@main/factories/controllers/car/specification/Delete';
import { makeListAllCarSpecificationsController } from '@main/factories/controllers/car/specification/ListAll';
import { makeUpdateCarSpecificationController } from '@main/factories/controllers/car/specification/Update';
import { makeAdminMiddleware } from '@main/factories/middlewares/Admin';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const carSpecificationsRoutes = Router();

carSpecificationsRoutes.post(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeCreateCarSpecificationController())
);
carSpecificationsRoutes.put(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeUpdateCarSpecificationController())
);
carSpecificationsRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeListAllCarSpecificationsController())
);
carSpecificationsRoutes.delete(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeDeleteCarSpecificationController())
);

export default carSpecificationsRoutes;
