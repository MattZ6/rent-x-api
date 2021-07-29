import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/usecases/create-specification/CreateSpecificationController';

const routes = Router();

const createSpecificationController = new CreateSpecificationController();

routes.post('/', createSpecificationController.handle);

export default routes;
