import { Router } from 'express';
import multer from 'multer';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeCreateCarController } from '@main/factories/controllers/car/Create';
import { makeGetCarDetailsController } from '@main/factories/controllers/car/GetDetails';
import { makeAddImagesToCarController } from '@main/factories/controllers/car/image/Add';
import { makeListCarsController } from '@main/factories/controllers/car/ListAll';
import { makeListAllAvailableCarsController } from '@main/factories/controllers/car/ListAllAvailable';
import { makeAddSpecificationsToCarController } from '@main/factories/controllers/car/specification/AddToCar';
import { makeRemoveSpecificationFromCarController } from '@main/factories/controllers/car/specification/RemoveFromCar';
import { makeGetCarScheduleController } from '@main/factories/controllers/rent/car/GetSchedule';
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

carsRoutes.get('/available', adaptRoute(makeListAllAvailableCarsController()));

carsRoutes.get(
  '/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeGetCarDetailsController())
);

carsRoutes.get('/:id/schedule', adaptRoute(makeGetCarScheduleController()));

carsRoutes.post(
  '/:id/specifications',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeAddSpecificationsToCarController())
);

carsRoutes.delete(
  '/:id/specifications/:specification_id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  adaptRoute(makeRemoveSpecificationFromCarController())
);

const upload = multer();

carsRoutes.post(
  '/:id/images',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeAdminMiddleware()),
  upload.array('files'),
  adaptRoute(makeAddImagesToCarController())
);

export default carsRoutes;
