import { Router } from 'express';

import { CreateRentController } from '@modules/rents/usecases/create-rent/CreateRentController';
import { DevolutionRentController } from '@modules/rents/usecases/devolution-rent/DevolutionRentController';
import { ListRentsByUserController } from '@modules/rents/usecases/list-rents-by-user/ListRentsByUserController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';

const routes = Router();

const createRentController = new CreateRentController();
const devolutionRentController = new DevolutionRentController();
const listRentsByUserController = new ListRentsByUserController();

routes.post('/', ensureAuthenticated, createRentController.handle);
routes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentController.handle
);
routes.get('/', ensureAuthenticated, listRentsByUserController.handle);

export default routes;
