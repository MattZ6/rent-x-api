import { Router } from 'express';

import { AddSpecificationsToCarController } from '@modules/cars/usecases/add-specifications-to-car/AddSpecificationsToCarController';
import { CreateCarController } from '@modules/cars/usecases/create-car/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/usecases/list-available-cars-use-case/ListAvailableCarsController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';
import { ensureIsAdminUser } from '@shared/infra/http/middlewares/ensure-is-admin-user';

const routes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const addSpecificationsToCarController = new AddSpecificationsToCarController();

routes.post(
  '/',
  ensureAuthenticated,
  ensureIsAdminUser,
  createCarController.handle
);

routes.get('/available', listAvailableCarsController.handle);

routes.post(
  '/:id/specifications',
  ensureAuthenticated,
  ensureIsAdminUser,
  addSpecificationsToCarController.handle
);

export default routes;
