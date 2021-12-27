import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeGetUserProfileController } from '@main/factories/controllers/user/GetUserProfileControllerFactory';

const profileRoutes = Router();

profileRoutes.get(
  '/',
  authenticationMiddleware,
  adaptRoute(makeGetUserProfileController())
);

export default profileRoutes;
