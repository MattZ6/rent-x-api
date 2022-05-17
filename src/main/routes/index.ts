import { Express, Router, static as expressStatic } from 'express';
import { resolve } from 'node:path';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { storageConfig } from '@main/config/environment/storage';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

import authenticationRoutes from './authentication.routes';
import carBrandsRoutes from './car-brand.routes';
import carCategoriesRoutes from './car-category.routes';
import carSpecificationsRoutes from './car-specification.routes';
import carsRoutes from './car.routes';
import profileRoutes from './profile.routes';
import rentRoutes from './rent.routes';

const routes = Router();

routes.use('/v1/auth', authenticationRoutes);
routes.use('/v1/profile', profileRoutes);
routes.use('/v1/brands', carBrandsRoutes);
routes.use('/v1/specifications', carSpecificationsRoutes);
routes.use('/v1/categories', carCategoriesRoutes);
routes.use('/v1/cars', carsRoutes);
routes.use('/v1/rents', rentRoutes);

// TODO: Verificar uma forma de deixar o storage dinâmico

const path = resolve(
  storageConfig.DISK_STORAGE_ROOT_FOLDER,
  storageConfig.AVATAR_FOLDER_PATH
);

routes.use(
  '/avatar',
  adaptMiddleware(makeAuthenticationMiddleware()),
  expressStatic(path, {
    setHeaders: res => {
      res.setHeader('Content-Type', 'image/jpeg');
    },
  })
);

export function setupRoutes(app: Express) {
  app.use(routes);
}
