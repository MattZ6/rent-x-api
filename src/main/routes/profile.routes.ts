import { Router } from 'express';
import multer from 'multer';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeGetUserProfileController } from '@main/factories/controllers/user/GetUserProfileControllerFactory';
import { makeUpdateUserAvatarController } from '@main/factories/controllers/user/UpdateUserAvatarControllerFactory';

const profileRoutes = Router();

const upload = multer();

profileRoutes.get(
  '/',
  authenticationMiddleware,
  adaptRoute(makeGetUserProfileController())
);

profileRoutes.patch(
  '/avatar',
  authenticationMiddleware,
  upload.single('file'),
  adaptRoute(makeUpdateUserAvatarController())
);

export default profileRoutes;
