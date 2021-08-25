import { Router } from 'express';

import { CreateCarController } from '@modules/cars/usecases/create-car/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/usecases/list-available-cars-use-case/ListAvailableCarsController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';
import { ensureIsAdminUser } from '@shared/infra/http/middlewares/ensure-is-admin-user';

const routes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

routes.post(
  '/',
  ensureAuthenticated,
  ensureIsAdminUser,
  createCarController.handle
);

routes.get('/available', listAvailableCarsController.handle);

export default routes;
