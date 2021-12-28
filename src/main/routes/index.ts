import { Router } from 'express';

import authenticationRoutes from './authentication.routes';
import carBrandsRoutes from './car-brand.routes';
import profileRoutes from './profile.routes';

const routes = Router();

routes.use('/v1/authentication', authenticationRoutes);
routes.use('/v1/profile', profileRoutes);
routes.use('/v1/brands', carBrandsRoutes);

export default routes;
