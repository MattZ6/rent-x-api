import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/usecases/create-specification/CreateSpecificationController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';
import { ensureIsAdminUser } from '@shared/infra/http/middlewares/ensure-is-admin-user';

const routes = Router();

const createSpecificationController = new CreateSpecificationController();

routes.post(
  '/',
  ensureAuthenticated,
  ensureIsAdminUser,
  createSpecificationController.handle
);

export default routes;
