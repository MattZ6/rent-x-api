import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const routes = Router();

routes.use('/v1/categories', categoriesRoutes);
routes.use('/v1/specifications', specificationsRoutes);

export { routes };
