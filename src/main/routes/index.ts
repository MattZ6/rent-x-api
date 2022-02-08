import { Router } from 'express';

import authenticationRoutes from './authentication.routes';
import carBrandsRoutes from './car-brand.routes';
import carCategoriesRoutes from './car-category.routes';
import carSpecificationsRoutes from './car-specification.routes';
import carsRoutes from './car.routes';
import profileRoutes from './profile.routes';
import rentRoutes from './rent.routes';

const routes = Router();

routes.use('/v1/authentication', authenticationRoutes);
routes.use('/v1/profile', profileRoutes);
routes.use('/v1/brands', carBrandsRoutes);
routes.use('/v1/specifications', carSpecificationsRoutes);
routes.use('/v1/categories', carCategoriesRoutes);
routes.use('/v1/cars', carsRoutes);
routes.use('/v1/rents', rentRoutes);

export default routes;
