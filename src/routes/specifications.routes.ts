import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/use-cases/create-specification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (req, res) =>
  createSpecificationController.handle(req, res)
);

export { specificationsRoutes };
