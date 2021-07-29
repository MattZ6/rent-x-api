import { Router } from 'express';

import { CreateUserController } from '../modules/users/usecases/create-user/CreateUserController';

const routes = Router();

const createUserController = new CreateUserController();

routes.post('/', createUserController.handle);

export default routes;
