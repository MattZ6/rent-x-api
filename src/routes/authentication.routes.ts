import { Router } from 'express';

import { AuthenticateUserController } from '../modules/users/usecases/authenticate-user/AuthenticateUserController';

const routes = Router();

const authenticateUserController = new AuthenticateUserController();

routes.post('/sessions', authenticateUserController.handle);

export default routes;
