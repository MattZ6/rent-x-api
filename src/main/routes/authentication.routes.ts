import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { makeCreateAccountController } from '@main/factories/controllers/user/CreateAccountControllerFactory';

const authenticationRoutes = Router();

authenticationRoutes.post(
  '/account',
  adaptRoute(makeCreateAccountController())
);

export default authenticationRoutes;
