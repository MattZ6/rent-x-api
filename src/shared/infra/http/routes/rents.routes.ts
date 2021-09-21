import { Router } from 'express';

import { CreateRentController } from '@modules/rents/usecases/create-rent/CreateRentController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';

const routes = Router();

const createRentController = new CreateRentController();

routes.post('/', ensureAuthenticated, createRentController.handle);

export default routes;
