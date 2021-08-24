import { Router } from 'express';

import { CreateCarController } from '@modules/cars/usecases/create-car/CreateCarController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';
import { ensureIsAdminUser } from '@shared/infra/http/middlewares/ensure-is-admin-user';

const routes = Router();

const createCarController = new CreateCarController();

routes.post(
  '/',
  ensureAuthenticated,
  ensureIsAdminUser,
  createCarController.handle
);

export default routes;
