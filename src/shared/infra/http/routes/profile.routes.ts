import { Router } from 'express';

import { GetProfileController } from '@modules/users/usecases/get-profile/GetProfileController';

import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

const routes = Router();

const getProfileController = new GetProfileController();

routes.get('/', ensureAuthenticated, getProfileController.handle);

export default routes;
