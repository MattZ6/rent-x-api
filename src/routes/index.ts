import { Router } from 'express';

import categoriesRoutes from './categories.routes';
import specificationRoutes from './specifications.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/v1/categories', categoriesRoutes);
routes.use('/v1/specifications', specificationRoutes);
routes.use('/v1/users', usersRoutes);

export default routes;
