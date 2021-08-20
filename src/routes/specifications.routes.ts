import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/usecases/create-specification/CreateSpecificationController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';

const routes = Router();

const createSpecificationController = new CreateSpecificationController();

routes.post('/', ensureAuthenticated, createSpecificationController.handle);

export default routes;
