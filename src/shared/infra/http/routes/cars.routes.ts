import { Router } from 'express';

import { CreateCarController } from '@modules/cars/usecases/create-car/CreateCarController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';

const routes = Router();

const createCarController = new CreateCarController();

routes.post('/', ensureAuthenticated, createCarController.handle);

export default routes;
