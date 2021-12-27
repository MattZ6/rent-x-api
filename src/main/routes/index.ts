import { Router } from 'express';

import authenticationRoutes from './authentication.routes';

const routes = Router();

routes.use('/v1/authentication', authenticationRoutes);

export default routes;
