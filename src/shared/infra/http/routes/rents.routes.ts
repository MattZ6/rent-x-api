import { Router } from 'express';

import { CreateRentController } from '@modules/rents/usecases/create-rent/CreateRentController';
import { DevolutionRentController } from '@modules/rents/usecases/devolution-rent/DevolutionRentController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';

const routes = Router();

const createRentController = new CreateRentController();
const devolutionRentController = new DevolutionRentController();

routes.post('/', ensureAuthenticated, createRentController.handle);
routes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentController.handle
);

export default routes;
